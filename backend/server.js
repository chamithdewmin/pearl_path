const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';

// Fixed MongoDB URL for production (Dokploy cluster).
// Explicitly target the "pearl_path" database and authenticate against "admin",
// which matches how most managed Mongo services create the initial user.
const DEFAULT_MONGODB_URI =
  'mongodb://pearl_path_user:QFvBV5Vk7v0TTZwzmKcw@pearl-path-database-12yohc:27017/pearl_path?authSource=admin';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await ensureDefaultAdmin();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Schemas & Models
const { Schema } = mongoose;

const VALID_DISTRICTS = ['Galle', 'Matara', 'Hambantota'];

// User / Auth
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    country: { type: String, trim: true },
    // Roles:
    // - admin: full system control
    // - tourist: regular traveller using the platform
    // - provider: hotel/vehicle/guide owner
    role: { type: String, enum: ['admin', 'tourist', 'provider'], default: 'tourist' },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

// Tourist Management
const touristSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    contactPhone: { type: String, trim: true },
    contactEmail: { type: String, trim: true },
    nationality: { type: String, trim: true },
    preferences: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Tourist = mongoose.model('Tourist', touristSchema);

// Hotel Management
const hotelSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    // Broad region (Galle / Matara / Hambantota)
    district: {
      type: String,
      enum: VALID_DISTRICTS,
      trim: true,
    },
    // More specific location or town name
    location: { type: String, trim: true },
    address: { type: String, trim: true },
    pricePerNight: { type: Number, required: true },
    facilities: [{ type: String, trim: true }],
    images: [{ type: String, trim: true }],
    availability: { type: Boolean, default: true },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Hotel = mongoose.model('Hotel', hotelSchema);

// Vehicle Management
const vehicleSchema = new Schema(
  {
    type: { type: String, required: true, trim: true }, // car, van, bike
    model: { type: String, trim: true },
    pricePerDay: { type: Number, required: true },
    district: { type: String, enum: VALID_DISTRICTS, trim: true },
    availabilityStatus: {
      type: String,
      enum: ['available', 'unavailable', 'maintenance'],
      default: 'available',
    },
    seats: { type: Number },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Tour Guide Management
const guideSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    languages: [{ type: String, trim: true }],
    district: { type: String, enum: VALID_DISTRICTS, trim: true },
    licenseNumber: { type: String, trim: true },
    isLicenseVerified: { type: Boolean, default: false },
    yearsExperience: { type: Number },
    area: { type: String, trim: true },
    pricePerDay: { type: Number, required: true },
    availabilityStatus: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    skills: [{ type: String, trim: true }],
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Guide = mongoose.model('Guide', guideSchema);

// Booking Management
const bookingSchema = new Schema(
  {
    tourist: { type: Schema.Types.ObjectId, ref: 'Tourist', required: true },
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    guide: { type: Schema.Types.ObjectId, ref: 'Guide' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    source: {
      type: String,
      enum: ['single', 'package'],
      default: 'single',
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

// Review Management
const reviewSchema = new Schema(
  {
    tourist: { type: Schema.Types.ObjectId, ref: 'Tourist', required: true },
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    guide: { type: Schema.Types.ObjectId, ref: 'Guide' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

// ---- Domain helpers ----

// Shared date-overlap logic: existing.start < requested.end && existing.end > requested.start
function buildOverlapQuery(fieldName, refId, startDate, endDate, extraMatch = {}) {
  if (!refId) {
    return null;
  }
  return {
    [fieldName]: refId,
    startDate: { $lt: endDate },
    endDate: { $gt: startDate },
    ...extraMatch,
  };
}

async function hasBookingConflict({ hotel, vehicle, guide, startDate, endDate, excludeId }) {
  const orClauses = [];
  const baseMatch = { status: { $in: ['pending', 'confirmed'] } };

  const hotelQuery = buildOverlapQuery('hotel', hotel, startDate, endDate, baseMatch);
  const vehicleQuery = buildOverlapQuery('vehicle', vehicle, startDate, endDate, baseMatch);
  const guideQuery = buildOverlapQuery('guide', guide, startDate, endDate, baseMatch);

  [hotelQuery, vehicleQuery, guideQuery].forEach((q) => {
    if (q) orClauses.push(q);
  });

  if (!orClauses.length) {
    return false;
  }

  const match = { $or: orClauses };
  if (excludeId) {
    match._id = { $ne: excludeId };
  }

  const conflict = await Booking.findOne(match).lean().exec();
  return !!conflict;
}

async function recomputeRatingsForTarget(targetField, targetId) {
  if (!targetId) return;

  const [result] = await Review.aggregate([
    {
      $match: {
        [targetField]: new mongoose.Types.ObjectId(targetId),
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]).exec();

  const update = result
    ? { averageRating: result.averageRating, reviewCount: result.reviewCount }
    : { averageRating: 0, reviewCount: 0 };

  if (targetField === 'hotel') {
    await Hotel.findByIdAndUpdate(targetId, update).exec();
  } else if (targetField === 'vehicle') {
    await Vehicle.findByIdAndUpdate(targetId, update).exec();
  } else if (targetField === 'guide') {
    await Guide.findByIdAndUpdate(targetId, update).exec();
  }
}

// Ensure default admin user exists
async function ensureDefaultAdmin() {
  const adminEmail = 'admin@gmail.com';
  const existing = await User.findOne({ email: adminEmail }).exec();
  if (existing) {
    return;
  }
  const plainPassword = '12345678';
  const passwordHash = await bcrypt.hash(plainPassword, 10);
  await User.create({
    email: adminEmail,
    passwordHash,
    name: 'Admin',
    role: 'admin',
  });
  console.log('✅ Default admin user created:', adminEmail);
}

// Auth handlers (shared between multiple route prefixes)
async function handleRegister(req, res) {
  try {
    const { email, password, name, phone, address, country } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const existing = await User.findOne({ email: email.toLowerCase() }).exec();
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      name,
      phone,
      address,
      country,
      role: 'tourist',
    });
    const token = jwt.sign(
      { sub: user._id.toString(), role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        country: user.country,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).exec();
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { sub: user._id.toString(), role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        country: user.country,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Auth routes (two prefixes: /api/auth/* and /api/tourism/users/*)
app.post('/api/auth/register', handleRegister);
app.post('/api/auth/login', handleLogin);

app.post('/api/tourism/users/register', handleRegister);
app.post('/api/tourism/users/login', handleLogin);

// Current user profile (for "My profile" page)
app.get('/api/tourism/users/me', authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).select('-passwordHash').exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/tourism/users/me', authRequired, async (req, res) => {
  try {
    const { name, phone, address, country, newPassword } = req.body;
    const user = await User.findById(req.user.sub).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (typeof name === 'string') user.name = name;
    if (typeof phone === 'string') user.phone = phone;
    if (typeof address === 'string') user.address = address;
    if (typeof country === 'string') user.country = country;

    if (newPassword && typeof newPassword === 'string' && newPassword.trim().length >= 8) {
      user.passwordHash = await bcrypt.hash(newPassword.trim(), 10);
    }

    const saved = await user.save();
    const plain = saved.toObject();
    delete plain.passwordHash;
    res.json(plain);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Auth middleware
function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function adminRequired(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

// Current user info
app.get('/api/auth/me', authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).select('-passwordHash').exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Helper: generic CRUD handlers
function registerCrudRoutes(app, basePath, Model, populate = [], options = {}) {
  const { softDelete = false, defaultFilter = {} } = options;

  // Create
  app.post(basePath, authRequired, adminRequired, async (req, res) => {
    try {
      const item = new Model(req.body);
      const saved = await item.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Read all
  app.get(basePath, async (req, res) => {
    try {
      let query = Model.find(defaultFilter);
      populate.forEach((p) => {
        query = query.populate(p);
      });
      const items = await query.exec();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Read one
  app.get(`${basePath}/:id`, async (req, res) => {
    try {
      let query = Model.findOne({ _id: req.params.id, ...defaultFilter });
      populate.forEach((p) => {
        query = query.populate(p);
      });
      const item = await query.exec();
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Update
  app.put(`${basePath}/:id`, authRequired, adminRequired, async (req, res) => {
    try {
      const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Delete
  app.delete(`${basePath}/:id`, authRequired, adminRequired, async (req, res) => {
    try {
      if (softDelete) {
        const updated = await Model.findByIdAndUpdate(
          req.params.id,
          { isActive: false },
          { new: true }
        );
        if (!updated) {
          return res.status(404).json({ message: 'Not found' });
        }
        return res.json({ message: 'Soft deleted successfully' });
      }

      const deleted = await Model.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
}

// Register CRUD routes
registerCrudRoutes(app, '/api/tourists', Tourist, [], {
  softDelete: true,
  defaultFilter: { isActive: true },
});

registerCrudRoutes(app, '/api/hotels', Hotel, [], {
  softDelete: true,
  defaultFilter: { isActive: true },
});

registerCrudRoutes(app, '/api/vehicles', Vehicle, [], {
  softDelete: true,
  defaultFilter: { isActive: true },
});

registerCrudRoutes(app, '/api/guides', Guide, [], {
  softDelete: true,
  defaultFilter: { isActive: true },
});

// Bookings and reviews use custom logic below instead of generic CRUD helper.

// ---- Booking routes ----

// List all bookings (admin only)
app.get('/api/bookings', authRequired, adminRequired, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('tourist')
      .populate('hotel')
      .populate('vehicle')
      .populate('guide')
      .exec();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single booking (admin only)
app.get('/api/bookings/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('tourist')
      .populate('hotel')
      .populate('vehicle')
      .populate('guide')
      .exec();
    if (!booking) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create booking (authenticated tourist or admin)
app.post('/api/bookings', authRequired, async (req, res) => {
  try {
    const { tourist, hotel, vehicle, guide, startDate, endDate, totalPrice, source } = req.body;

    if (!tourist || !startDate || !endDate) {
      return res
        .status(400)
        .json({ message: 'tourist, startDate and endDate are required for a booking' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start >= end) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today) {
      return res.status(400).json({ message: 'Cannot book past dates' });
    }

    const conflict = await hasBookingConflict({
      hotel,
      vehicle,
      guide,
      startDate: start,
      endDate: end,
    });

    if (conflict) {
      return res.status(409).json({ message: 'Selected services are not available for these dates' });
    }

    const booking = await Booking.create({
      tourist,
      hotel: hotel || undefined,
      vehicle: vehicle || undefined,
      guide: guide || undefined,
      startDate: start,
      endDate: end,
      totalPrice,
      source: source || 'single',
      status: 'pending',
    });

    const populated = await booking
      .populate('tourist')
      .populate('hotel')
      .populate('vehicle')
      .populate('guide');

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update booking (admin only, with conflict check on dates/services)
app.put('/api/bookings/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const existing = await Booking.findById(req.params.id).exec();
    if (!existing) {
      return res.status(404).json({ message: 'Not found' });
    }

    const payload = { ...req.body };
    const start = payload.startDate ? new Date(payload.startDate) : existing.startDate;
    const end = payload.endDate ? new Date(payload.endDate) : existing.endDate;

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start >= end) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    const conflict = await hasBookingConflict({
      hotel: payload.hotel || existing.hotel,
      vehicle: payload.vehicle || existing.vehicle,
      guide: payload.guide || existing.guide,
      startDate: start,
      endDate: end,
      excludeId: existing._id,
    });

    if (conflict) {
      return res.status(409).json({ message: 'Selected services are not available for these dates' });
    }

    existing.set({
      ...payload,
      startDate: start,
      endDate: end,
    });

    const saved = await existing.save();
    const populated = await saved
      .populate('tourist')
      .populate('hotel')
      .populate('vehicle')
      .populate('guide');

    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cancel booking (admin only; soft cancel using status)
app.delete('/api/bookings/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    ).exec();
    if (!booking) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---- Review routes ----

// List reviews with optional filters (public)
app.get('/api/reviews', async (req, res) => {
  try {
    const { hotel, vehicle, guide } = req.query;
    const match = { isDeleted: false };
    if (hotel) match.hotel = hotel;
    if (vehicle) match.vehicle = vehicle;
    if (guide) match.guide = guide;

    const reviews = await Review.find(match)
      .populate('tourist')
      .populate('hotel')
      .populate('vehicle')
      .populate('guide')
      .exec();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---- Tourist-facing booking routes ----

// List bookings for the currently authenticated user (tourist portal)
app.get('/api/tourism/my-bookings', authRequired, async (req, res) => {
  try {
    const bookings = await Booking.find({ tourist: req.user.sub })
      .populate('hotel')
      .populate('vehicle')
      .populate('guide')
      .sort({ startDate: -1 })
      .exec();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single review
app.get('/api/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('tourist')
      .populate('hotel')
      .populate('vehicle')
      .populate('guide')
      .exec();
    if (!review || review.isDeleted) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create review (authenticated; requires completed booking)
app.post('/api/reviews', authRequired, async (req, res) => {
  try {
    const { tourist, hotel, vehicle, guide, rating, comment } = req.body;

    if (!tourist || !rating) {
      return res.status(400).json({ message: 'tourist and rating are required' });
    }

    if (!hotel && !vehicle && !guide) {
      return res
        .status(400)
        .json({ message: 'At least one target (hotel, vehicle or guide) is required' });
    }

    const match = {
      tourist,
      status: 'completed',
    };
    if (hotel) match.hotel = hotel;
    if (vehicle) match.vehicle = vehicle;
    if (guide) match.guide = guide;

    const completedBooking = await Booking.findOne(match).exec();
    if (!completedBooking) {
      return res
        .status(400)
        .json({ message: 'Review allowed only after a completed booking for this service' });
    }

    const review = await Review.create({
      tourist,
      hotel: hotel || undefined,
      vehicle: vehicle || undefined,
      guide: guide || undefined,
      rating,
      comment,
    });

    if (hotel) await recomputeRatingsForTarget('hotel', hotel);
    if (vehicle) await recomputeRatingsForTarget('vehicle', vehicle);
    if (guide) await recomputeRatingsForTarget('guide', guide);

    const populated = await review
      .populate('tourist')
      .populate('hotel')
      .populate('vehicle')
      .populate('guide');

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update review (admin only, e.g. to edit abusive text)
app.put('/api/reviews/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();
    if (!review || review.isDeleted) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (review.hotel) await recomputeRatingsForTarget('hotel', review.hotel);
    if (review.vehicle) await recomputeRatingsForTarget('vehicle', review.vehicle);
    if (review.guide) await recomputeRatingsForTarget('guide', review.guide);

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete review (admin only, soft delete)
app.delete('/api/reviews/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    ).exec();
    if (!review) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (review.hotel) await recomputeRatingsForTarget('hotel', review.hotel);
    if (review.vehicle) await recomputeRatingsForTarget('vehicle', review.vehicle);
    if (review.guide) await recomputeRatingsForTarget('guide', review.guide);

    res.json({ message: 'Review removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---- District overview & search ----

app.get('/api/districts/:name/overview', async (req, res) => {
  try {
    const districtName = req.params.name;
    if (!VALID_DISTRICTS.includes(districtName)) {
      return res.status(400).json({ message: 'Invalid district' });
    }

    const [hotels, guides, vehicles] = await Promise.all([
      Hotel.find({ district: districtName, isActive: true })
        .sort({ averageRating: -1 })
        .limit(6)
        .exec(),
      Guide.find({ district: districtName, isActive: true, isLicenseVerified: true })
        .sort({ averageRating: -1 })
        .limit(6)
        .exec(),
      Vehicle.find({ district: districtName, isActive: true })
        .sort({ averageRating: -1 })
        .limit(6)
        .exec(),
    ]);

    const ATTRACTIONS = {
      Galle: ['Galle Fort', 'Unawatuna Beach', 'Jungle Beach'],
      Matara: ['Polhena Beach', 'Matara Fort', 'Dondra Head Lighthouse'],
      Hambantota: ['Yala National Park', 'Bundala National Park', 'Hambantota Port View'],
    };

    const TRAVEL_TIPS = {
      Galle: 'Best for heritage walks and relaxed beaches. Ideal from December to April.',
      Matara: 'Great for quieter beaches and snorkeling. Evenings are calm and family friendly.',
      Hambantota: 'Perfect base for safaris and nature. Book park permits early in peak season.',
    };

    res.json({
      district: districtName,
      attractions: ATTRACTIONS[districtName] || [],
      travelTips: TRAVEL_TIPS[districtName] || '',
      featured: {
        hotels,
        guides,
        vehicles,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Hotel search
app.get('/api/search/hotels', async (req, res) => {
  try {
    const { district, minPrice, maxPrice } = req.query;
    const match = { isActive: true };
    if (district) match.district = district;
    if (minPrice) match.pricePerNight = { ...(match.pricePerNight || {}), $gte: Number(minPrice) };
    if (maxPrice) match.pricePerNight = { ...(match.pricePerNight || {}), $lte: Number(maxPrice) };

    const hotels = await Hotel.find(match).sort({ averageRating: -1 }).exec();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Vehicle search
app.get('/api/search/vehicles', async (req, res) => {
  try {
    const { type, district } = req.query;
    const match = { isActive: true };
    if (type) match.type = type;
    if (district) match.district = district;

    const vehicles = await Vehicle.find(match).sort({ pricePerDay: 1 }).exec();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Guide search
app.get('/api/search/guides', async (req, res) => {
  try {
    const { language, district, minRating } = req.query;
    const match = { isActive: true, isLicenseVerified: true };
    if (language) match.languages = language;
    if (district) match.district = district;
    if (minRating) match.averageRating = { $gte: Number(minRating) };

    const guides = await Guide.find(match).sort({ averageRating: -1 }).exec();
    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API root (useful for platform health checks hitting /api)
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'Pearl Path API root' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Global error handler (fallback)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API listening on port ${PORT}`);
});

module.exports = app;


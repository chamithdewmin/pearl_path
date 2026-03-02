const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';

// Use provided MongoDB URL by default, but allow override via env
const DEFAULT_MONGODB_URI =
  'mongodb://pearl_path_user:QFvBV5Vk7v0TTZwzmKcw@pearl-path-database-12yohc:27017';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection
mongoose
  .connect(MONGODB_URI, {
    dbName: 'pearl_path',
  })
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await ensureDefaultAdmin();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Schemas & Models
const { Schema } = mongoose;

// User / Auth
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, trim: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
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
  },
  { timestamps: true }
);

const Tourist = mongoose.model('Tourist', touristSchema);

// Hotel Management
const hotelSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    pricePerNight: { type: Number, required: true },
    facilities: [{ type: String, trim: true }],
    images: [{ type: String, trim: true }],
    availability: { type: Boolean, default: true },
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
    availabilityStatus: {
      type: String,
      enum: ['available', 'unavailable', 'maintenance'],
      default: 'available',
    },
    seats: { type: Number },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Tour Guide Management
const guideSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    languages: [{ type: String, trim: true }],
    area: { type: String, trim: true },
    pricePerDay: { type: Number, required: true },
    availabilityStatus: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    skills: [{ type: String, trim: true }],
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
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

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

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
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
      role: 'user',
    });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
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
        role: user.role,
      },
    });
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
function registerCrudRoutes(app, basePath, Model, populate = []) {
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
      let query = Model.find();
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
      let query = Model.findById(req.params.id);
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
registerCrudRoutes(app, '/api/tourists', Tourist);
registerCrudRoutes(app, '/api/hotels', Hotel);
registerCrudRoutes(app, '/api/vehicles', Vehicle);
registerCrudRoutes(app, '/api/guides', Guide);
registerCrudRoutes(app, '/api/bookings', Booking, [
  'tourist',
  'hotel',
  'vehicle',
  'guide',
]);
registerCrudRoutes(app, '/api/reviews', Review, [
  'tourist',
  'hotel',
  'vehicle',
  'guide',
]);

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


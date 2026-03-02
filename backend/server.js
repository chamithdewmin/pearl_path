const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 4000;

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
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Schemas & Models
const { Schema } = mongoose;

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

// Helper: generic CRUD handlers
function registerCrudRoutes(app, basePath, Model, populate = []) {
  // Create
  app.post(basePath, async (req, res) => {
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
  app.put(`${basePath}/:id`, async (req, res) => {
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
  app.delete(`${basePath}/:id`, async (req, res) => {
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


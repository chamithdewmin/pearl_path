// Run these commands in mongosh to set up the Pearl Path database.

// 1) Create application database user (run in the "admin" database)
//    Only do this once, and only if the user doesn't already exist.
//    This matches your connection string:
//    mongodb://pearl_path_user:QFvBV5Vk7v0TTZwzmKcw@pearl-path-database-12yohc:27017
//
// use admin
// db.createUser({
//   user: "pearl_path_user",
//   pwd: "QFvBV5Vk7v0TTZwzmKcw",
//   roles: [{ role: "readWrite", db: "pearl_path" }]
// })

// 2) Switch to application database
use("pearl_path");

// 3) USERS collection (store ONLY hashed passwords, never plain-text)
db.createCollection("users");
db.users.createIndex({ username: 1 }, { unique: true });

// Example admin user.
// IMPORTANT: Replace <BCRYPT_HASH_HERE> with a real bcrypt hash of your password.
// You can generate it in Node.js, for example:
//
//   const bcrypt = require('bcrypt');
//   bcrypt.hash('YourStrongPassword', 10).then(console.log);
//
// Then paste the hash value into passwordHash below.
db.users.insertOne({
  username: "admin",
  passwordHash: "<BCRYPT_HASH_HERE>",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
});

// 4) TOURISTS collection
db.createCollection("tourists");
db.tourists.createIndex({ name: 1 });
db.tourists.insertOne({
  name: "John Doe",
  contactPhone: "+94 71 123 4567",
  contactEmail: "john@example.com",
  nationality: "UK",
  preferences: "Beach, wildlife",
  createdAt: new Date(),
  updatedAt: new Date()
});

// 5) HOTELS collection
db.createCollection("hotels");
db.hotels.createIndex({ name: 1 });
db.hotels.createIndex({ location: 1 });
db.hotels.insertOne({
  name: "Southern Pearl Hotel",
  location: "Galle, Southern Province",
  pricePerNight: 120,
  facilities: ["WiFi", "Pool", "Breakfast", "Airport Pickup"],
  images: ["https://example.com/hotel1.jpg"],
  availability: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// 6) VEHICLES collection
db.createCollection("vehicles");
db.vehicles.createIndex({ type: 1 });
db.vehicles.insertOne({
  type: "car",
  model: "Toyota Prius",
  pricePerDay: 50,
  availabilityStatus: "available",
  seats: 4,
  createdAt: new Date(),
  updatedAt: new Date()
});

// 7) GUIDES collection
db.createCollection("guides");
db.guides.createIndex({ name: 1 });
db.guides.insertOne({
  name: "Kamal Perera",
  languages: ["English", "Sinhala"],
  area: "Galle / Mirissa",
  pricePerDay: 40,
  availabilityStatus: "available",
  skills: ["Surf tours", "Historical sites"],
  createdAt: new Date(),
  updatedAt: new Date()
});

// 8) BOOKINGS collection
db.createCollection("bookings");
db.bookings.createIndex({ tourist: 1 });
db.bookings.createIndex({ startDate: 1 });

// Example booking linking existing documents.
// NOTE: Replace ObjectId() values with real IDs from your tourists/hotels/vehicles/guides.
db.bookings.insertOne({
  tourist: ObjectId("000000000000000000000000"),  // replace with real tourist _id
  hotel: ObjectId("000000000000000000000000"),    // replace with real hotel _id or remove
  vehicle: ObjectId("000000000000000000000000"),  // replace with real vehicle _id or remove
  guide: ObjectId("000000000000000000000000"),    // replace with real guide _id or remove
  startDate: new Date("2026-03-10"),
  endDate: new Date("2026-03-15"),
  totalPrice: 600,
  status: "confirmed",
  createdAt: new Date(),
  updatedAt: new Date()
});

// 9) REVIEWS collection
db.createCollection("reviews");
db.reviews.createIndex({ tourist: 1 });
db.reviews.insertOne({
  tourist: ObjectId("000000000000000000000000"), // replace with real tourist _id
  hotel: ObjectId("000000000000000000000000"),   // or vehicle/guide, or remove if not used
  rating: 5,
  comment: "Amazing stay and excellent service!",
  createdAt: new Date(),
  updatedAt: new Date()
});


/**
 * Create all collections and indexes in your MongoDB Atlas (pearl_path) database.
 * Run once after pointing MONGODB_URI in .env to your Atlas connection string.
 *
 * Usage: from backend folder:  node scripts/init-atlas.js
 * Or:    npm run db:init
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Build URI: if MONGODB_PASSWORD is set, replace <db_password> in MONGODB_URI (fixes special chars)
let MONGODB_URI = process.env.MONGODB_URI;
const password = process.env.MONGODB_PASSWORD;
if (password != null && password !== '') {
  MONGODB_URI = (MONGODB_URI || '').replace('<db_password>', encodeURIComponent(password));
}
if (!MONGODB_URI || MONGODB_URI.includes('<db_password>')) {
  console.error('❌ In .env set MONGODB_URI (Atlas URL) and either:');
  console.error('   - Put your real password in the URL (no special chars), or');
  console.error('   - Keep <db_password> in the URL and set MONGODB_PASSWORD=your_password');
  process.exit(1);
}

const COLLECTIONS = ['users', 'tourists', 'hotels', 'vehicles', 'guides', 'bookings', 'reviews'];

async function main() {
  console.log('Connecting to MongoDB Atlas (pearl_path)...');
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;

  for (const name of COLLECTIONS) {
    try {
      await db.createCollection(name);
      console.log('  ✅ Collection:', name);
    } catch (e) {
      if (e.code === 48) console.log('  ⏭️  Already exists:', name);
      else throw e;
    }
  }

  console.log('Creating indexes...');
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('bookings').createIndex({ tourist: 1 });
  await db.collection('bookings').createIndex({ startDate: 1 });
  await db.collection('reviews').createIndex({ tourist: 1 });
  console.log('  ✅ Indexes created.');

  const adminEmail = 'admin@gmail.com';
  const passwordHash = await bcrypt.hash('12345678', 10);
  const existing = await db.collection('users').findOne({ email: adminEmail });
  const now = new Date();

  if (existing) {
    await db.collection('users').updateOne(
      { email: adminEmail },
      { $set: { passwordHash, role: 'admin', updatedAt: now } }
    );
    console.log('  ✅ Default admin updated:', adminEmail);
  } else {
    await db.collection('users').insertOne({
      email: adminEmail,
      passwordHash,
      name: 'Admin',
      role: 'admin',
      createdAt: now,
      updatedAt: now,
    });
    console.log('  ✅ Default admin created:', adminEmail, '(password: 12345678)');
  }

  await mongoose.disconnect();
  console.log('\n✅ All tables (collections) are ready in your Atlas database.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

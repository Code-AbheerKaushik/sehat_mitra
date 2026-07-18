/**
 * SehatMitra Database Seed Script
 * Populates MongoDB with initial mock data for hospitals, outbreak alerts, and ASHA workers.
 * Run with: node scripts/seed.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI not found in .env.local');
  process.exit(1);
}

// ─── Schemas (inline for standalone script) ───────────────────────────────────

const HospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  distanceLabel: String,
  isOpen: Boolean,
  doctors: [{ name: String, specialty: String, isAvailable: Boolean }],
  whatsappNumber: String,
}, { timestamps: true });

const OutbreakAlertSchema = new mongoose.Schema({
  disease: String,
  casesCount: Number,
  area: String,
  severity: String,
  preventionMeasures: String,
  isActive: { type: Boolean, default: true },
  reportedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const AshaWorkerSchema = new mongoose.Schema({
  name: String,
  village: String,
  phone: String,
  isAvailable: { type: Boolean, default: true },
  area: String,
  whatsappNumber: String,
}, { timestamps: true });

const Hospital = mongoose.model('Hospital', HospitalSchema);
const OutbreakAlert = mongoose.model('OutbreakAlert', OutbreakAlertSchema);
const AshaWorker = mongoose.model('AshaWorker', AshaWorkerSchema);

// ─── Seed Data ─────────────────────────────────────────────────────────────────

const hospitals = [
  {
    name: 'Govt. Rajindra Hospital',
    address: 'New Lal Bagh Colony, Patiala',
    phone: '+91-175-2212018',
    distanceLabel: '5.8 km',
    isOpen: true,
    doctors: [
      { name: 'Dr. Gurpreet Singh', specialty: 'General Physician', isAvailable: true },
      { name: 'Dr. Harleen Kaur', specialty: 'Pediatrician', isAvailable: true },
    ],
    whatsappNumber: '+911752212018',
  },
  {
    name: 'Community Health Centre, Sanaur',
    address: 'Sanaur, Patiala District',
    phone: '+91-175-2650234',
    distanceLabel: '12.3 km',
    isOpen: true,
    doctors: [
      { name: 'Dr. Vikramjeet Gill', specialty: 'Emergency Medicine', isAvailable: true },
      { name: 'Dr. Simran Bedi', specialty: 'Gynecologist', isAvailable: false },
    ],
    whatsappNumber: '+911752650234',
  },
];

const outbreakAlerts = [
  {
    disease: 'dengue',
    casesCount: 45,
    area: 'Model Town, Patiala',
    severity: 'high',
    preventionMeasures: 'Remove stagnant water, use mosquito nets',
    isActive: true,
  },
  {
    disease: 'typhoid',
    casesCount: 12,
    area: 'Village Sanaur',
    severity: 'medium',
    preventionMeasures: 'Drink boiled water, maintain hygiene',
    isActive: true,
  },
  {
    disease: 'viralFever',
    casesCount: 78,
    area: 'Urban Estate, Patiala',
    severity: 'medium',
    preventionMeasures: 'Avoid crowds, wear a mask, stay hydrated',
    isActive: true,
  },
];

const ashaWorkers = [
  { name: 'Sunita Devi', village: 'Lehal', phone: '+91-9876543210', isAvailable: true, area: 'Patiala' },
  { name: 'Manjeet Kaur', village: 'Sanaur', phone: '+91-9876543211', isAvailable: true, area: 'Patiala District' },
  { name: 'Geeta Rani', village: 'Daun Kalan', phone: '+91-9876543212', isAvailable: true, area: 'Patiala District' },
  { name: 'Paramjeet Kaur', village: 'Bahadurgarh', phone: '+91-9876543213', isAvailable: true, area: 'Patiala' },
];

// ─── Main ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI, { dbName: 'sehatmitra' });
  console.log('✅ Connected to MongoDB (sehatmitra)');

  // Clear existing collections
  await Hospital.deleteMany({});
  await OutbreakAlert.deleteMany({});
  await AshaWorker.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // Insert seed data
  await Hospital.insertMany(hospitals);
  console.log(`🏥 Inserted ${hospitals.length} hospitals`);

  await OutbreakAlert.insertMany(outbreakAlerts);
  console.log(`🚨 Inserted ${outbreakAlerts.length} outbreak alerts`);

  await AshaWorker.insertMany(ashaWorkers);
  console.log(`👩‍⚕️ Inserted ${ashaWorkers.length} ASHA workers`);

  console.log('\n✅ Database seeded successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  mongoose.disconnect();
  process.exit(1);
});

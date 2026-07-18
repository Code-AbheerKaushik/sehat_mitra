import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  specialty: { type: String, required: true, trim: true },
  isAvailable: { type: Boolean, default: true },
});

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    // For distance calculations using geospatial queries
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    distanceLabel: {
      type: String, // e.g., '5.8 km' – used as a display label
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    doctors: {
      type: [DoctorSchema],
      default: [],
    },
    whatsappNumber: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Enable geospatial indexing for location-based queries
HospitalSchema.index({ coordinates: '2dsphere' });

const Hospital =
  mongoose.models.Hospital || mongoose.model('Hospital', HospitalSchema);

export default Hospital;

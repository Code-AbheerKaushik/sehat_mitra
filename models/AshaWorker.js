import mongoose from 'mongoose';

const AshaWorkerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    village: {
      type: String,
      required: true,
      trim: true,
      index: true, // Allows fast search by village name
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    area: {
      type: String,
      trim: true,
      default: '',
      // Broader area name (e.g., 'Patiala District')
    },
    whatsappNumber: {
      type: String,
      default: '',
    },
    specialization: {
      type: String,
      default: '',
      // e.g., 'Maternal Health', 'Child Immunization'
    },
  },
  {
    timestamps: true,
  }
);

const AshaWorker =
  mongoose.models.AshaWorker || mongoose.model('AshaWorker', AshaWorkerSchema);

export default AshaWorker;

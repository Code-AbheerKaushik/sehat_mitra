import mongoose from 'mongoose';

const OutbreakAlertSchema = new mongoose.Schema(
  {
    disease: {
      type: String,
      required: true,
      trim: true,
      // e.g., 'dengue', 'typhoid', 'viralFever'
    },
    casesCount: {
      type: Number,
      required: true,
      min: 0,
    },
    area: {
      type: String,
      required: true,
      trim: true,
      // e.g., 'Model Town, Patiala'
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    preventionMeasures: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true, // Allows fast filtering of active alerts
    },
    reportedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const OutbreakAlert =
  mongoose.models.OutbreakAlert || mongoose.model('OutbreakAlert', OutbreakAlertSchema);

export default OutbreakAlert;

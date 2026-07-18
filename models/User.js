import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null for non-google users
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Medical Profile
    age: {
      type: Number,
      min: 0,
      max: 150,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''],
      default: '',
    },
    allergies: {
      type: String,
      default: '',
    },
    chronicConditions: {
      type: String,
      default: '',
    },
    dietPreference: {
      type: String,
      enum: ['vegetarian', 'nonVegetarian', ''],
      default: '',
    },
    language: {
      type: String,
      enum: ['en', 'hi', 'pa', 'or'],
      default: 'en',
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Prevent model recompilation in Next.js hot reloads
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

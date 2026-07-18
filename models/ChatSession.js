import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['user', 'bot'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
    language: {
      type: String,
      enum: ['en', 'hi', 'pa', 'or'],
      default: 'en',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const ChatSession =
  mongoose.models.ChatSession || mongoose.model('ChatSession', ChatSessionSchema);

export default ChatSession;

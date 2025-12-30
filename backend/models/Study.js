import mongoose from 'mongoose';

const studySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a study title'],
      trim: true,
      maxlength: [300, 'Title cannot exceed 300 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    condition: {
      type: String,
      required: [true, 'Please specify the medical condition'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    source: {
      type: String,
      // e.g., "Journal of Medicine", URL to research paper
    },
    publicationDate: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      // Full article content or summary
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    attachments: [
      {
        filename: String,
        url: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    shares: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Study', studySchema);

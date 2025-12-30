import mongoose from 'mongoose';

const moderatorBookingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    moderator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    contactRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContactRequest',
      required: true,
    },
    topic: {
      type: String,
      required: [true, 'Please provide a consultation topic'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['booked', 'in-progress', 'completed', 'cancelled'],
      default: 'booked',
    },
    scheduledDate: {
      type: Date,
    },
    notes: {
      type: String,
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

export default mongoose.model('ModeratorBooking', moderatorBookingSchema);

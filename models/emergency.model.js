import mongoose from 'mongoose';

const EmergencySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: false },
    },
    reporter: {
      name: { type: String, required: true },
      contact: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['Pending', 'Dispatched', 'En Route', 'On Scene', 'Resolved'],
      default: 'Pending',
    },
    assignedResponders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    media: [{ type: String }], // Array of media URLs (images/videos)
    reportedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

EmergencySchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Emergency = mongoose.model('Emergency', EmergencySchema);

export default Emergency;

import mongoose from 'mongoose';

const IncidentSchema = new mongoose.Schema({
    type: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Incident', IncidentSchema);
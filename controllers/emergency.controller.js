import Emergency from '../models/emergency.model.js';

// Create new emergency
export const createEmergency = async (req, res) => {
    try {
        const { title, description, location, reporter, media } = req.body;
        const newEmergency = new Emergency({
            title,
            description,
            location,
            reporter,
            media,
            status: "Pending"
        });
        await newEmergency.save();
        res.status(201).json({ message: "Emergency reported successfully", newEmergency });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all emergencies
export const getEmergencies = async (req, res) => {
    try {
        const emergencies = await Emergency.find();
        res.status(200).json(emergencies);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get specific emergency by ID
export const getEmergencyById = async (req, res) => {
    try {
        const emergency = await Emergency.findById(req.params.id);
        if (!emergency) return res.status(404).json({ message: "Emergency not found" });
        res.status(200).json(emergency);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update emergency
export const updateEmergency = async (req, res) => {
    try {
        const updatedEmergency = await Emergency.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmergency) return res.status(404).json({ message: "Emergency not found" });
        res.status(200).json({ message: "Emergency updated", updatedEmergency });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete emergency
export const deleteEmergency = async (req, res) => {
    try {
        const deletedEmergency = await Emergency.findByIdAndDelete(req.params.id);
        if (!deletedEmergency) return res.status(404).json({ message: "Emergency not found" });
        res.status(200).json({ message: "Emergency deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

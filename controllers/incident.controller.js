import Incident from '../models/incident.model.js';

// Create new incident
export const createIncident = async (req, res) => {
    try {
        const { type, location, description, status } = req.body;
        const newIncident = new Incident({ type, location, description, status: status || "Pending" });
        await newIncident.save();
        res.status(201).json({ message: "Incident reported successfully", newIncident });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all incidents
export const getIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find();
        res.status(200).json(incidents);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get specific incident by ID
export const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if (!incident) return res.status(404).json({ message: "Incident not found" });
        res.status(200).json(incident);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update incident
export const updateIncident = async (req, res) => {
    try {
        const updatedIncident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIncident) return res.status(404).json({ message: "Incident not found" });
        res.status(200).json({ message: "Incident updated", updatedIncident });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete incident
export const deleteIncident = async (req, res) => {
    try {
        const deletedIncident = await Incident.findByIdAndDelete(req.params.id);
        if (!deletedIncident) return res.status(404).json({ message: "Incident not found" });
        res.status(200).json({ message: "Incident deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

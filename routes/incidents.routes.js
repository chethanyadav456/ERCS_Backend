import { Router } from 'express';
import { createIncident, getIncidents, getIncidentById, updateIncident, deleteIncident } from '../controllers/incident.controller.js';

const incidentRouter = Router();

incidentRouter.post('/create', createIncident); // Report new incident
incidentRouter.get('/', getIncidents); // Get all incidents
incidentRouter.get('/:id', getIncidentById); // Get incident by ID
incidentRouter.put('/:id', updateIncident); // Update incident details
incidentRouter.delete('/:id', deleteIncident); // Delete an incident

export default incidentRouter;
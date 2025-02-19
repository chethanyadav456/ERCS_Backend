import express from 'express';
import {
    createEmergency,
    getEmergencies,
    getEmergencyById,
    updateEmergency,
    deleteEmergency
} from '../controllers/emergency.controller.js';

const router = express.Router();

// Emergency Routes
router.post('/emergencies', createEmergency);
router.get('/emergencies', getEmergencies);
router.get('/emergencies/:id', getEmergencyById);
router.patch('/emergencies/:id', updateEmergency);
router.delete('/emergencies/:id', deleteEmergency);

export default router;
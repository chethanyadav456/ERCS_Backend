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
router.post('/', createEmergency);
router.get('/', getEmergencies);
router.get('/:id', getEmergencyById);
router.patch('/:id', updateEmergency);
router.delete('/:id', deleteEmergency);

export default router;
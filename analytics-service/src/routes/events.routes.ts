import express from 'express';
import * as eventsController from '../controllers/events.controller';

const router = express.Router();

router.post('/', eventsController.createEvent);
router.get('/', eventsController.getAllEvents);
router.get('/:type', eventsController.getEventsByType);

export default router;
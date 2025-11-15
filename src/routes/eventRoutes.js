const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');
const authMiddleware = require('../middlewares/AuthMiddleware');

// === Rute Event ===

// GET /api/events/joined/my-events 
router.get('/joined/my-events', authMiddleware, EventController.getMyJoinedEvents);

// POST /api/events (Create Event)
router.post('/', authMiddleware, EventController.createEvent);

// GET /api/events (Get All Events)
router.get('/', EventController.getAllEvents); 

// GET /api/events/joined/my-events 
router.get('/joined/my-events', authMiddleware, EventController.getMyJoinedEvents);

// GET /api/events/created/my-events 
router.get('/created/my-events', authMiddleware, EventController.getMyCreatedEvents);

// GET /api/events/:id 
router.get('/:id', EventController.getEventDetails);

// GET /api/events/:id (Get Event Details)
router.get('/:id', EventController.getEventDetails); 

// PUT /api/events/:id (Update Event)
router.put('/:id', authMiddleware, EventController.updateEvent);

// DELETE /api/events/:id (Delete Event)
router.delete('/:id', authMiddleware, EventController.deleteEvent);

// POST /api/events/:id/join (Join Event)
router.post('/:id/join', authMiddleware, EventController.joinEvent);

// DELETE /api/events/:id/leave (Leave Event)
router.delete('/:id/leave', authMiddleware, EventController.leaveEvent);

module.exports = router;
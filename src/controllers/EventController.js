const EventService = require('../services/EventService');

const EventController = {
  // POST /api/events
  async createEvent(req, res) {
    try {
      const event = await EventService.createEvent(req.body, req.user.id);
      res.status(201).json({ message: 'Event berhasil dibuat', data: event });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // GET /api/events
  
  async getAllEvents(req, res) {
    try {
      const events = await EventService.getAllEvents();
      res.status(200).json({ data: events });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /api/events/:id
  async getEventDetails(req, res) {
    try {
      const event = await EventService.getEventDetails(req.params.id);
      res.status(200).json({ data: event });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  // PUT /api/events/:id
  async updateEvent(req, res) {
    try {
      const event = await EventService.updateEvent(req.params.id, req.user.id, req.body);
      res.status(200).json({ message: 'Event berhasil diperbarui', data: event });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE /api/events/:id
  async deleteEvent(req, res) {
    try {
      await EventService.deleteEvent(req.params.id, req.user.id);
      res.status(200).json({ message: 'Event berhasil dihapus' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // POST /api/events/:id/join
  async joinEvent(req, res) {
    try {
      const result = await EventService.joinEvent(req.params.id, req.user.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE /api/events/:id/leave
  async leaveEvent(req, res) {
    try {
      const result = await EventService.leaveEvent(req.params.id, req.user.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getMyCreatedEvents(req, res) {
    try {
      const events = await EventService.getEventsByCreator(req.user.id);
      res.status(200).json({ data: events });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /api/events/joined/my-events
  async getMyJoinedEvents(req, res) {
    try {
      const events = await EventService.getMyJoinedEvents(req.user.id);
      res.status(200).json({ data: events });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = EventController;
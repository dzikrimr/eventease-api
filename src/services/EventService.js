const Event = require('../models/Event');
const EventParticipant = require('../models/EventParticipant');

const EventService = {

  async createEvent(eventData, creator_id) {
    if (!eventData.title || !eventData.description || !eventData.date || !eventData.location || !eventData.capacity) {
      throw new Error('Semua field wajib diisi');
    }
    return Event.create({ ...eventData, creator_id });
  },

  async getAllEvents() {
    return Event.findAll();
  },

  
  async getEventDetails(eventId) {
    const event = await Event.findByIdWithCreator(eventId);
    if (!event) throw new Error('Event tidak ditemukan');
    const participants = await EventParticipant.findUsersByEventId(eventId);
    return { ...event, participants: participants || [] };
  },
  

  
  async updateEvent(eventId, userId, eventData) {
    const event = await Event.findById(eventId);
    if (!event) throw new Error('Event tidak ditemukan');

    if (event.creator_id !== userId) {
      throw new Error('Anda tidak berhak mengedit event ini');
    }
    return Event.update(eventId, eventData);
  },

  
  async deleteEvent(eventId, userId) {
    const event = await Event.findById(eventId);
    if (!event) throw new Error('Event tidak ditemukan');

    if (event.creator_id !== userId) {
      throw new Error('Anda tidak berhak menghapus event ini');
    }
    return Event.remove(eventId);
  },

  
  async joinEvent(eventId, userId) {
    const event = await Event.findById(eventId);
    if (!event) throw new Error('Event tidak ditemukan');

    const existingJoin = await EventParticipant.findByUserAndEvent(userId, eventId);
    if (existingJoin) throw new Error('Anda sudah terdaftar di event ini');

    const participantCount = await EventParticipant.countByEventId(eventId);
    if (participantCount >= event.capacity) {
      throw new Error('Kapasitas event sudah penuh');
    }
    if (event.creator_id === userId) {
      throw new Error('Kreator tidak bisa join event sendiri');
    }
    await EventParticipant.join(userId, eventId);
    return { message: 'Berhasil bergabung dengan event' };
  },

  
  async leaveEvent(eventId, userId) {
    const existingJoin = await EventParticipant.findByUserAndEvent(userId, eventId);
    if (!existingJoin) throw new Error('Anda belum terdaftar di event ini');
    await EventParticipant.leave(userId, eventId);
    return { message: 'Berhasil keluar dari event' };
  },
  
  async getMyJoinedEvents(userId) {
    return EventParticipant.findEventsByUserId(userId);
  },
  
  async getEventsByCreator(userId) {
    return Event.findByCreatorId(userId);
  },
};

module.exports = EventService;
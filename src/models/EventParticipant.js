const knex = require('../config/db');

const EventParticipant = {
  // Create (Join event)
  async join(user_id, event_id) {
    return knex('event_participants').insert({ user_id, event_id });
  },

  // Delete (Leave event)
  async leave(user_id, event_id) {
    return knex('event_participants').where({ user_id, event_id }).del();
  },

  // Read: Check if user has joined
  async findByUserAndEvent(user_id, event_id) {
    return knex('event_participants').where({ user_id, event_id }).first();
  },

  // Read: Get count of participants for an event
  async countByEventId(event_id) {
    const result = await knex('event_participants')
      .where({ event_id })
      .count('id as participant_count')
      .first();
    return result.participant_count;
  },

  // Read: Get all events a user has joined
  async findEventsByUserId(user_id) {
    return knex('event_participants')
      .select('events.*')
      .join('events', 'event_participants.event_id', 'events.id')
      .where('event_participants.user_id', user_id);
  },

  // Read: Get all users participating in an event
  async findUsersByEventId(event_id) {
    return knex('event_participants')
      .select('users.id', 'users.name', 'users.profile_picture')
      .join('users', 'event_participants.user_id', 'users.id')
      .where('event_participants.event_id', event_id);
  },
};

module.exports = EventParticipant;
const knex = require('../config/db');

const Event = {
  // Create
  async create(eventData) {
    const [id] = await knex('events').insert(eventData);
    return this.findById(id);
  },

  // Read: Find by ID
  async findById(id) {
    return knex('events').where({ id }).first();
  },

  async findByCreatorId(creator_id) {
    return knex('events')
      .where({ creator_id })
      .orderBy('date', 'desc');
  },

  // Read: Find by ID (with creator info)
  async findByIdWithCreator(id) {
    return knex('events')
      .select('events.*', 'users.name as creator_name', 'users.profile_picture as creator_profile_picture')
      .join('users', 'events.creator_id', 'users.id')
      .where('events.id', id)
      .first();
  },

  // Read: Get all events (with creator info)
  async findAll() {
    return knex('events')
      .select('events.*', 'users.name as creator_name')
      .join('users', 'events.creator_id', 'users.id')
      .orderBy('events.date', 'desc');
  },

  // Update
  async update(id, eventData) {
    await knex('events').where({ id }).update(eventData);
    return this.findById(id);
  },

  // Delete
  async remove(id) {
    return knex('events').where({ id }).del();
  },
};

module.exports = Event;
const knex = require('../config/db');

const User = {
  
  async findByEmail(email) {
    return knex('users')
      .select('id', 'name', 'email', 'profile_picture', 'password')
      .where({ email })
      .first();
  },

  async findById(id) {
    return knex('users')
      .select('id', 'name', 'email', 'profile_picture', 'created_at')
      .where({ id })
      .first();
  },

  async createUser({ name, email, password, profile_picture }) {
    const [id] = await knex('users').insert({
      name,
      email,
      password,
      profile_picture: profile_picture || null,
    });
    
    return this.findById(id);
  },
  
  async update(id, userData) {
    await knex('users').where({ id }).update(userData);
    return this.findById(id);
  },

  async remove(id) {
    return knex('users').where({ id }).del();
  },
};

module.exports = User;
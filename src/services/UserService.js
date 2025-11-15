const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwt: jwtConfig } = require('../config/env');
const { uploadToCloudinary } = require('../config/cloudinary');

const UserService = {
  async register({ name, email, password, profile_picture }) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) throw new Error('Email sudah terdaftar');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser({
      name,
      email,
      password: hashedPassword,
      profile_picture,
    });

    const token = jwt.sign({ id: newUser.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    return { user: newUser, token };
  },

  async login({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) throw new Error('Email tidak ditemukan');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Password salah');

    const token = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    return { user, token };
  },

async updateUser(id, userData, file) {
    const user = await User.findById(id);
    if (!user) throw new Error('User tidak ditemukan');

    const { name, email } = userData; 

    if (email && email !== user.email) {
      const existingUser = await User.findByEmail(email);
      if (existingUser) throw new Error('Email sudah terdaftar');
    }
    
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (file) {
      const uploadResult = await uploadToCloudinary(file.buffer);
      updateData.profile_picture = uploadResult.secure_url;
    }
    return User.update(id, updateData);
  },

  async getUserById(id) {
    
    const user = await User.findById(id);
    if (!user) throw new Error('User tidak ditemukan');
    return user;
  },

  async deleteUser(id) {
    const user = await User.findById(id);
    if (!user) throw new Error('User tidak ditemukan');
    return User.remove(id);
  }
};

module.exports = UserService;

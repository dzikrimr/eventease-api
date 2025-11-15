const UserService = require("../services/UserService");

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password, profile_picture } = req.body;
      const result = await UserService.register({
        name,
        email,
        password,
        profile_picture,
      });
      res.status(201).json({ message: "Registrasi berhasil", data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login({ email, password });
      res.status(200).json({ message: "Login berhasil", data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getProfile(req, res) {
    try {
      res.json({ message: "Berhasil mengambil profil", user: req.user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateProfile(req, res) {
    try {
      const { id } = req.user;
      const { name, email, profile_picture } = req.body;

      const updatedUser = await UserService.updateUser(id, {
        name,
        email,
        profile_picture,
      });
      res
        .status(200)
        .json({ message: "Profil berhasil diperbarui", data: updatedUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User tidak ditemukan" });
      }
      res.status(200).json({ data: user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteProfile(req, res) {
    try {
      const { id } = req.user;
      await UserService.deleteUser(id);
      res.status(200).json({ message: "Akun berhasil dihapus" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = UserController;

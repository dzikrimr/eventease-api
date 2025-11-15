const express = require('express');
const router = express.Router();

const UserController = require('../controllers/EventController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const upload = require('../middlewares/UploadMiddleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, UserController.updateProfile);
router.delete('/profile', authMiddleware, UserController.deleteProfile);
router.get('/:id', UserController.getUserById);
router.put('/profile', authMiddleware, UserController.updateProfile);

module.exports = router;

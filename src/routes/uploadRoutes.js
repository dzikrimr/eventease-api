const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../controllers/UploadController');

const storage = multer.memoryStorage(); // biar buffer bisa diakses
const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;

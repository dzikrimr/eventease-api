const { uploadToCloudinary } = require('../services/UploadService');
const Upload = require('../models/Upload');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Tidak ada file yang diupload' });
    }

    const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    const uploadData = new Upload(result.secure_url, result.public_id);

    res.status(200).json({
      message: 'Upload berhasil ✅',
      data: uploadData,
    });
  } catch (error) {
    console.error('❌ Error upload:', error);
    res.status(500).json({
      message: 'Gagal upload gambar',
      error: error.message,
    });
  }
};

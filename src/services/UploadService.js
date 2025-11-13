const cloudinary = require('../config/cloudinary');

exports.uploadToCloudinary = async (fileBuffer, mimetype) => {
  try {
    const base64String = `data:${mimetype};base64,${fileBuffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'eventease',
    });
    return result;
  } catch (error) {
    throw new Error('Gagal mengunggah ke Cloudinary: ' + error.message);
  }
};

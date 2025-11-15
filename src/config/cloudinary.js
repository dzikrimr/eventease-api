const cloudinary = require('cloudinary').v2;
const { cloudinary: config } = require('./env');

cloudinary.config({
  cloud_name: config.name,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'eventease' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

module.exports = { cloudinary, uploadToCloudinary };

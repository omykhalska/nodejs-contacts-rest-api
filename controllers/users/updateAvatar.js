const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const { User } = require('../../models');
require('dotenv').config();

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file to upload' });
  }

  const { _id: id } = req.user;
  const { path: tempUpload } = req.file;

  try {
    const avatar = await cloudinary.uploader.upload(tempUpload, {
      folder: 'avatars',
      use_filename: true,
      unique_filename: false,
      transformation: [
        { gravity: 'auto', height: 250, width: 250, crop: 'fill' },
      ],
    });
    const avatarURL = avatar.secure_url;

    await User.findByIdAndUpdate(id, { avatarURL }, { new: true });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  } finally {
    fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;

// services/tourScheduleService.js
const { bucket } = require("../config/firebase"); // Import bucket từ Firebase
const TourSchedule = require("../models/index").TourSchedule;

const uploadImage = async (file) => {
  const fileName = `tours/${Date.now()}_${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (err) => {
      console.error(err);
      reject(err);
    });

    stream.on("finish", async () => {
      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(publicUrl);
    });

    stream.end(file.buffer);
  });
};

const createTourSchedule = async (tourData, files) => {
  if (files && files.length > 0) {
    const imageUrls = await Promise.all(files.map(uploadImage));

    // Gắn URL hình ảnh vào mô tả
    tourData.description = tourData.description.map((item, index) => ({
      ...item,
      image: imageUrls[index] || item.image, // Gắn URL tương ứng
    }));
  }

  return await TourSchedule.create(tourData);
};

module.exports = {
  createTourSchedule,
};

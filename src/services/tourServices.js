// services/tourService.js
const { bucket } = require("../config/firebase");
const Tour = require("../models").Tour;

const uploadFiles = async (files) => {
  if (!files || !Array.isArray(files) || files.length === 0) {
    return []; // Trả về mảng rỗng nếu không có file
  }

  const imageUrls = [];
  for (const file of files) {
    const fileName = `tours/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await new Promise((resolve, reject) => {
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
        imageUrls.push(publicUrl);
        resolve();
      });

      stream.end(file.buffer);
    });
  }
  return imageUrls;
};

const createTour = async (tourData, files) => {
  const imageUrls = await uploadFiles(files);
  return await Tour.create({ ...tourData, image: imageUrls });
};

// Export the functions
module.exports = {
  uploadFiles,
  createTour,
};

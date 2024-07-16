// services/userService.js
const { bucket } = require("../config/firebase");
const User = require("../models").User;

// const uploadFile = async (file) => {
//   console.log("uploadFile", file);
//   if (!file) return null;

//   const fileName = `users/${Date.now()}_${file.originalname}`;
//   const fileUpload = bucket.file(fileName);

//   await new Promise((resolve, reject) => {
//     const stream = fileUpload.createWriteStream({
//       metadata: {
//         contentType: file.mimetype,
//       },
//     });

//     stream.on("error", (err) => {
//       console.error(err);
//       reject(err);
//     });

//     stream.on("finish", async () => {
//       await fileUpload.makePublic();
//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
//       resolve(publicUrl);
//     });

//     stream.end(file.buffer);
//   });

//   return fileUpload.publicUrl;
// };
const uploadFile = async (file) => {
  console.log("uploadFile", file);
  if (!file) return null;

  const fileName = `users/${Date.now()}_${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  const publicUrl = await new Promise((resolve, reject) => {
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
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(url);
    });

    stream.end(file.buffer);
  });

  return publicUrl;
};

const createUser = async (userData, file) => {
  const imageUrl = await uploadFile(file);
  return await User.create({ ...userData, image: imageUrl });
};

const updateUser = async (id, userData, file) => {
  let imageUrl = null;
  if (file) {
    imageUrl = await uploadFile(file);
  } else {
    console.log("No file provided for upload.");
  }

  // Cập nhật thông tin người dùng
  return await User.update(
    { ...userData, ...(imageUrl && { image: imageUrl }) }, // Chỉ cập nhật image nếu có URL
    { where: { id } }
  );
};
// Export the functions
module.exports = {
  uploadFile,
  createUser,
  updateUser,
};

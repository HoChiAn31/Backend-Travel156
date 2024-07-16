const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../controllers/user");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", User.getAllUsers);
router.get("/:id", User.getOneUser);
router.get("/getUser/:email", User.getUserByEmail);
router.post("/", upload.single("image"), User.createUser);
router.put("/:id", upload.single("image"), User.updateUser);
router.patch("/:id", upload.single("image"), User.updateUser);
router.patch(
  "/updateUser/:email",
  upload.single("image"),
  User.updateUserByEmail
);
router.delete("/:id", User.deleteUser);
module.exports = router;

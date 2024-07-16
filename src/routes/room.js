const express = require("express");
const router = express.Router();
const Room = require("../controllers/room");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", Room.getAllRooms);
router.get("/:id", Room.getOneRoom);
router.get("/hotel/:hotelId", Room.getRoomByHotel);
router.post("/", upload.array("images"), Room.createRoom);
router.put("/:id", upload.array("images"), Room.updateRoom);
router.patch("/:id", upload.array("images"), Room.updateRoom);
router.delete("/:id", Room.deleteRoom);
module.exports = router;

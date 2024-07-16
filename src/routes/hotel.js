const express = require("express");
const router = express.Router();
const Hotel = require("../controllers/hotel");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", Hotel.getAllHotels);
router.get("/filter", Hotel.getFilterHotels);
router.get("/:id", Hotel.getOneHotel);
router.get("/htsh/search", Hotel.searchHotels);
router.post("/", upload.array("images"), Hotel.createHotel);
router.put("/:id", Hotel.updateHotel);
router.patch("/:id", Hotel.updateHotel);
router.delete("/:id", Hotel.deleteHotel);

module.exports = router;

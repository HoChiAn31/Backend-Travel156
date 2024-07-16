const express = require("express");
const router = express.Router();
const multer = require("multer");
const Tour = require("../controllers/tour");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", Tour.getAllTours);
router.get("/filter", Tour.getFilterTour);
router.get("/:id", Tour.getOneTour);
router.post("/", upload.array("images"), Tour.createTour);
router.put("/:id", upload.array("images"), Tour.updateTour);
router.patch("/:id", upload.array("images"), Tour.updateTour);
router.delete("/:id", Tour.deleteTour);
module.exports = router;

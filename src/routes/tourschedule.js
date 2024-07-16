const express = require("express");
const router = express.Router();
const Tourschedule = require("../controllers/tourSchedule");

router.get("/", Tourschedule.getAllTourSchedules);
router.get("/:id", Tourschedule.getOneTourSchedule);
router.post("/", Tourschedule.createTourSchedule);
router.put("/:id", Tourschedule.updateTourSchedule);
router.patch("/:id", Tourschedule.updateTourSchedule);
router.delete("/:id", Tourschedule.deleteTourSchedule);

module.exports = router;

const express = require("express");
const router = express.Router();
const HotelBookings = require("../controllers/hotelBooking");

router.get("/", HotelBookings.getAllHotelBookingss);
router.get("/:id", HotelBookings.getOneHotelBookings);
router.get("/userId/:userId", HotelBookings.getOneHotelBookingByUserId);
router.post("/", HotelBookings.createHotelBookings);
router.put("/:id", HotelBookings.updateHotelBookings);
router.patch("/:id", HotelBookings.updateHotelBookings);
router.delete("/:id", HotelBookings.deleteHotelBookings);
module.exports = router;

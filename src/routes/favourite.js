const express = require("express");
const router = express.Router();
const Favourite = require("../controllers/favourite");

router.get("/", Favourite.getAllFavourites);
router.get("/:id", Favourite.getOneFavourite);
router.post("/", Favourite.createFavourite);
router.put("/:id", Favourite.updateFavourite);
router.patch("/:id", Favourite.updateFavourite);
router.delete("/:id", Favourite.deleteFavourite);
module.exports = router;

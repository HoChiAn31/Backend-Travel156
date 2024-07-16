const express = require("express");
const router = express.Router();
const Promotion = require("../controllers/promotion");

router.get("/", Promotion.getAllPromotions);
router.get("/:id", Promotion.getOnePromotion);
router.get("/pmsh/search", Promotion.searchPromotion);
router.post("/", Promotion.createPromotion);
router.put("/:id", Promotion.updatePromotion);
router.patch("/:id", Promotion.updatePromotion);
router.delete("/:id", Promotion.deletePromotion);

module.exports = router;

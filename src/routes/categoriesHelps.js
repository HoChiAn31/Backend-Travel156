const express = require("express");
const router = express.Router();
const CategoriesHelps = require("../controllers/categorieshelps");

router.get("/", CategoriesHelps.getAllCategoriesHelpss);
router.get("/:id", CategoriesHelps.getOneCategoriesHelps);
router.post("/", CategoriesHelps.createCategoriesHelps);
router.put("/:id", CategoriesHelps.updateCategoriesHelps);
router.patch("/:id", CategoriesHelps.updateCategoriesHelps);
router.delete("/:id", CategoriesHelps.deleteCategoriesHelps);
module.exports = router;

const express = require("express");

const router = express.Router();

const categoryController = require('../controllers/categoryController')

const checkAuth = require('../middleware/checkAuth');

router.use(checkAuth)
router.get("/", categoryController.getCategory)
router.get("/:id", categoryController.detailsCategory)
router.post("/", categoryController.addCategory)
router.put("/:id", categoryController.updateCategory)
router.delete("/:id", categoryController.deleteCategory)

module.exports = router;
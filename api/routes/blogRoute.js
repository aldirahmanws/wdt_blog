const express = require("express");

const router = express.Router();

const blogController = require('../controllers/blogController')

const checkAuth = require('../middleware/checkAuth');

router.get("/", blogController.getBlog)
router.use(checkAuth)
router.get("/my_blog", blogController.getMyBlog)
router.get("/:id", blogController.detailsBlog)
router.post("/", blogController.addBlog)
router.put("/:id", blogController.updateBlog)
router.delete("/:id", blogController.deleteBlog)

module.exports = router;
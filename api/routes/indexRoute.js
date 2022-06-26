const express = require("express");

router = express.Router();

const authRoute = require('./authRoute') 
const categoryRoute = require('./categoryRoute') 
const blogRoute = require('./blogRoute') 

router.use("/auth", authRoute);
router.use("/category", categoryRoute);
router.use("/blog", blogRoute);

module.exports = router;
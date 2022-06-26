const express = require("express");

const router = express.Router();

const authController = require('../controllers/authController')

const checkAuth = require('../middleware/checkAuth');

router.post("/signup", authController.signup)
router.post("/signin", authController.signin)
router.post("/forgot_password", authController.forgotPassword)
router.post("/reset_password", authController.resetPassword)
router.post("/refresh_token", authController.refreshToken)

router.use(checkAuth)
router.put("/change_password", authController.changePassword)

module.exports = router;
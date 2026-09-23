const { Router } = require("express");
const authRouter = Router();
const {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
} = require("../controllers/authController");
const { authUser } = require("../middlewares/authMiddleware");

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add token in blacklist
 * @access Public
 */
authRouter.get("/logout", logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get details of current logged in user
 * @access private
 */
authRouter.get("/get-me", authUser, getMeController);

module.exports = authRouter;

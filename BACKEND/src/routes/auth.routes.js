const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = express.Router();

/**
 * @route POST api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUser);

/**
 * @route POST api/auth/login
 * @description Login an existing user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUser);

/**
 * @route GET api/auth/logout
 * @description Logout a user by clearing the token cookie
 * @access Public
 */
authRouter.get("/logout", authController.logoutUser);

/**
 * @route GET api/auth/get-me
 * @description Get the currently logged-in user's information
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getme);

module.exports = authRouter;

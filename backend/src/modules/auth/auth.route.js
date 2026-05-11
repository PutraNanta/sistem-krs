import express from "express";
import * as authController from "./auth.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authController.login);
router.get("/profile", authMiddleware, authController.getProfile);

export default router;

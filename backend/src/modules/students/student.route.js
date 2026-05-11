import express from "express";
import * as studentController from "./student.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import { roleMiddleware } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["student"]),
  studentController.getProfile,
);

export default router;

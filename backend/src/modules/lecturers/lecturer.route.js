import express from "express";
import * as lecturerController from "./lecturer.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import { roleMiddleware } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["lecturer"]),
  lecturerController.getProfile,
);
router.get(
  "/:lecturerId",
  authMiddleware,
  roleMiddleware(["admin", "lecturer"]),
  lecturerController.getById,
);

export default router;

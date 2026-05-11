import express from "express";
import * as krsController from "./krs.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import { roleMiddleware } from "../../middleware/roleMiddleware.js";

const router = express.Router();

// Student routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["student"]),
  krsController.createKrs,
);
router.get(
  "/current",
  authMiddleware,
  roleMiddleware(["student"]),
  krsController.getCurrentKrs,
);
router.get(
  "/history",
  authMiddleware,
  roleMiddleware(["student"]),
  krsController.getKrsHistory,
);
router.post(
  "/:krsId/add-class",
  authMiddleware,
  roleMiddleware(["student"]),
  krsController.addClassToKrs,
);
router.delete(
  "/:krsDetailId/remove-class",
  authMiddleware,
  roleMiddleware(["student"]),
  krsController.removeClassFromKrs,
);
router.post(
  "/:krsId/submit",
  authMiddleware,
  roleMiddleware(["student"]),
  krsController.submitKrs,
);

// Lecturer/Admin approval routes
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware(["lecturer", "admin"]),
  krsController.getPendingKrs,
);
router.post(
  "/:krsId/approve",
  authMiddleware,
  roleMiddleware(["lecturer", "admin"]),
  krsController.approveKrs,
);
router.post(
  "/:krsId/reject",
  authMiddleware,
  roleMiddleware(["lecturer", "admin"]),
  krsController.rejectKrs,
);

export default router;

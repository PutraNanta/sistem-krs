import express from "express";
import * as classController from "./class.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/available", authMiddleware, classController.getAvailableClasses);
router.get("/:classId", authMiddleware, classController.getClassDetails);

export default router;

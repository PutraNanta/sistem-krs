import express from "express";
import * as courseController from "./course.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, courseController.getCourses);
router.get("/:courseId", authMiddleware, courseController.getCourseById);

export default router;

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import authRoute from "./modules/auth/auth.route.js";
import studentRoute from "./modules/students/student.route.js";
import lecturerRoute from "./modules/lecturers/lecturer.route.js";
import courseRoute from "./modules/courses/course.route.js";
import classRoute from "./modules/classes/class.route.js";
import krsRoute from "./modules/krs/krs.route.js";
import { errorResponse } from "./utils/response.js";

dotenv.config();

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"].filter(Boolean);
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KRS backend is running",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/students", studentRoute);
app.use("/api/lecturers", lecturerRoute);
app.use("/api/courses", courseRoute);
app.use("/api/classes", classRoute);
app.use("/api/krs", krsRoute);

app.use((req, res) => {
  return errorResponse(res, 404, "Route not found");
});

app.use((err, req, res, next) => {
  console.error(err);
  return errorResponse(res, 500, "Internal server error", err);
});

const PORT = process.env.PORT || 3000;

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

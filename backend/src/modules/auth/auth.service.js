import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as authRepository from "./auth.repository.js";

dotenv.config();

export const loginService = async (email, password) => {
  // Find user by email
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  if (!user.is_active) {
    throw new Error("User account is inactive");
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || "24h" },
  );

  return {
    token,
    user: {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

export const getProfileService = async (userId) => {
  const user = await authRepository.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // If user is student, get additional student info
  if (user.role === "student") {
    const studentInfo = await authRepository.findStudentByUserId(userId);
    return {
      ...user,
      studentInfo,
    };
  }

  return user;
};

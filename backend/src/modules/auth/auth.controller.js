import { loginSchema } from "./auth.validation.js";
import * as authService from "./auth.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const result = await authService.loginService(email, password);

    successResponse(res, 200, "Login successful", result);
  } catch (error) {
    if (error.name === "ZodError") {
      return errorResponse(res, 400, "Validation error", error.errors);
    }
    errorResponse(res, 401, error.message);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await authService.getProfileService(userId);

    successResponse(res, 200, "Profile retrieved successfully", profile);
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
};

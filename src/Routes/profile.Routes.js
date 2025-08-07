import express from "express";
import {
  registerProfile,
  login,
  getUser,
  updateProfile
} from "../Controller/profile.Controller.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Registration route
router.post("/register", registerProfile);

// Login route
router.post("/login", login);

// Get user profile (protected)
router.get("/getUser", protect, getUser);

// Update user profile (protected)
router.put("/update", protect, updateProfile);

export default router;
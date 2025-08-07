import express from "express";
import {
    // sendOtp,
    // verifyOtp,
    registerProfile,
    login,
    getUser,
    updateProfile
} from "../Controller/profile.Controller.js";
import { protect } from "../Middleware/authMiddleware.js";
// import upload from "../Middleware/multer.js";

const router = express.Router();

// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);
// router.post("/register", upload.single("photo"), registerProfile);
router.post("/register",registerProfile);
router.post("/login", login);
router.get("/getUser", protect, getUser);
// router.put("/update",  upload.single("photo"), protect, updateProfile)
router.put("/update", protect, updateProfile)

export default router;
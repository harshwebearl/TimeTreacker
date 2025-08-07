// server.js (or app.js)

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/Config/db.js";

// Route imports
import ProfileRoutes from "./src/Routes/profile.Routes.js";
import AdminRoutes from "./src/Routes/admin.Routes.js";
import AttendanceRoutes from "./src/Routes/attendance.Routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Log all requests
app.use((req, res, next) => {
  const currentTime = new Date().toLocaleString();
  console.log(`[${currentTime}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use("/api/profile", ProfileRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/attendance", AttendanceRoutes);

// 404 fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: `🔍 Route not found: ${req.originalUrl}` });
});

// Start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

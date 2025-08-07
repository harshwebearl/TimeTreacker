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

// Welcome route with API listing
app.get("/", (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  res.json({
    message: "Welcome to the Time Tracker API!",
    apis: [
      {
        base: `${baseUrl}/api/profile`,
        endpoints: [
          { method: "POST", path: "/register" },
          { method: "POST", path: "/login" },
          { method: "GET", path: "/getUser" },
          { method: "PUT", path: "/update" }
        ]
      },
      {
        base: `${baseUrl}/api/admin`,
        endpoints: [
          { method: "POST", path: "/login" },
          { method: "GET", path: "/getadminprofile" },
          { method: "PUT", path: "/updateprofile" },
          { method: "PUT", path: "/changepassword" },
          { method: "GET", path: "/getallusers" },
          { method: "GET", path: "/getuser/:id" },
          { method: "POST", path: "/filter" },
          { method: "GET", path: "/byuserid/:id" }
        ]
      },
      {
        base: `${baseUrl}/api/attendance`,
        endpoints: [
          { method: "POST", path: "/create" },
          { method: "GET", path: "/getAllAttendance" },
          { method: "GET", path: "/getAttendanceById/:id" },
          { method: "PUT", path: "/updateAttendance/:id" },
          { method: "DELETE", path: "/deleteAttendance/:id" },
          { method: "POST", path: "/getByDate" },
          { method: "POST", path: "/dateRange" }
        ]
      }
    ]
  });
});

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

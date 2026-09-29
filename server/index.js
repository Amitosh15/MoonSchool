import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import studentRoutes from "./routes/studentRoute.js";
import activityRoutes from "./routes/activityRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Configure middleware
app.use(
  cors({
    origin: [CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for development
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  res.json({
    status: "ok",
    system: "Moon School Safe App Backend",
    database: `MongoDB (${states[dbState] || "Unknown"})`,
    host: mongoose.connection.host || "Not connected yet",
    timestamp: new Date().toISOString(),
  });
});

// Guard API routes if database is not connected
app.use("/api", (req, res, next) => {
  if (req.path === "/health") return next();
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message:
        "MongoDB is not connected yet. Please add your MongoDB Atlas URL to server/.env under MONGODB_URI.",
    });
  }
  next();
});

// Mount modular API routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/activity", activityRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
  🚀 ==========================================
  🌙 MOON SCHOOL BACKEND SERVER IS RUNNING
  📡 Port: http://localhost:${PORT}
  🍃 Database: MongoDB Atlas
  🛡️  Auth: JWT (JSON Web Tokens) + bcrypt
  🔗 Health Check: http://localhost:${PORT}/api/health
  ==========================================
  `);
});

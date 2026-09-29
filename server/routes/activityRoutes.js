import express from "express";
import { getLogs, addLog } from "../controllers/activityController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getLogs);
router.post("/", addLog);

export default router;

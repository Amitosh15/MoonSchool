import express from "express";
import {
  getStudents,
  addStudent,
  updateStudent,
} from "../controllers/studentController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getStudents);
router.post("/", addStudent);
router.put("/:id", updateStudent);

export default router;

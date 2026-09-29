import mongoose from "mongoose";
import Student from "../models/Student.js";

export async function getStudents(req, res) {
  try {
    const students = await Student.find({ userId: req.user._id });
    return res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("getStudents error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve students." });
  }
}

export async function addStudent(req, res) {
  try {
    const userId = req.user._id;
    const {
      name,
      grade,
      homeroom,
      teacher,
      avatar,
      emergencyContact,
      assignedPole = 7,
      assignedLane = "Lane 3",
    } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Student name is required." });
    }

    const id = req.body.id || `MS-${Math.floor(100 + Math.random() * 900)}`;
    const carTag = id;

    const newStudent = await Student.create({
      id,
      userId,
      name,
      grade: grade || "Grade 1",
      homeroom: homeroom || "Gr. 1A",
      teacher: teacher || "Assigned Staff",
      avatar:
        avatar ||
        "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
      carTag,
      emergencyContact: emergencyContact || req.user.phone || "",
      assignedPole,
      assignedLane,
    });

    return res.status(201).json({
      success: true,
      message: "Student registered successfully.",
      student: newStudent,
    });
  } catch (error) {
    console.error("addStudent error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to register student." });
  }
}

export async function updateStudent(req, res) {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const {
      name,
      grade,
      homeroom,
      teacher,
      emergencyContact,
      assignedPole,
      assignedLane,
    } = req.body;

    const query = {
      $or: [
        { id },
        ...(mongoose.Types.ObjectId.isValid(id) ? [{ _id: id }] : []),
      ],
      userId,
    };

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (grade !== undefined) updateFields.grade = grade;
    if (homeroom !== undefined) updateFields.homeroom = homeroom;
    if (teacher !== undefined) updateFields.teacher = teacher;
    if (emergencyContact !== undefined)
      updateFields.emergencyContact = emergencyContact;
    if (assignedPole !== undefined) updateFields.assignedPole = assignedPole;
    if (assignedLane !== undefined) updateFields.assignedLane = assignedLane;

    const updated = await Student.findOneAndUpdate(
      query,
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Student not found or unauthorized.",
        });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated.",
      student: updated,
    });
  } catch (error) {
    console.error("updateStudent error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update student." });
  }
}

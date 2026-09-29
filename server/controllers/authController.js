import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Student from "../models/Student.js";

const JWT_SECRET =
  process.env.JWT_SECRET || "moonschool_super_secret_jwt_key_2026_safe_app";
const JWT_EXPIRES_IN = "7d";

export async function register(req, res) {
  try {
    const {
      name,
      email,
      password,
      phone = "",
      relation = "Parent / Guardian",
      vehicle = "",
      plateNumber = "",
      children = [],
    } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, mobile number, and password are required fields.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Check if user with email already exists in MongoDB
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email address already exists.",
      });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Primary carTag from first child or generated
    const primaryCarTag =
      children && children.length > 0 && children[0].id
        ? children[0].id
        : `MS-${Math.floor(100 + Math.random() * 900)}`;

    const initialPickups = [
      {
        name: name.trim(),
        relation: `${relation} (Primary)`,
        phone: phone.trim() || "704-555-0000",
        verified: true,
        isDefault: true,
      },
    ];

    // Create user in MongoDB
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone.trim(),
      relation,
      carTag: primaryCarTag,
      vehicle,
      plateNumber,
      defaultTransporter: "Parent",
      authorizedPickups: initialPickups,
    });

    // Insert children if provided
    let insertedStudents = [];
    if (Array.isArray(children) && children.length > 0) {
      const studentsToInsert = children.map((c, index) => {
        const studentId = c.id || `MS-${Math.floor(100 + Math.random() * 900)}`;
        return {
          id: studentId,
          userId: user._id,
          name: c.name || `Child #${index + 1}`,
          grade: c.grade || "Grade 1",
          homeroom: c.homeroom || "Gr. 1A",
          teacher: c.teacher || "Assigned Homeroom Staff",
          avatar:
            c.avatar ||
            "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
          carTag: studentId,
          emergencyContact: c.emergencyContact || phone,
          assignedPole: c.assignedPole || 7 + index,
          assignedLane: c.assignedLane || "Lane 3",
        };
      });

      insertedStudents = await Student.insertMany(studentsToInsert);
    }

    // Sign JWT with MongoDB _id
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user,
      students: insertedStudents,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration.",
      error: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    // Look up user in MongoDB
    const userWithPassword = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!userWithPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. User with this email does not exist.",
      });
    }

    // Verify password
    const isMatch = bcrypt.compareSync(password, userWithPassword.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Fetch students associated with user
    const students = await Student.find({ userId: userWithPassword._id });

    // Sign JWT
    const token = jwt.sign(
      { id: userWithPassword._id, email: userWithPassword.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    return res.status(200).json({
      success: true,
      message: "Authentication successful.",
      token,
      user: userWithPassword,
      students,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login.",
      error: error.message,
    });
  }
}

export async function getMe(req, res) {
  try {
    const userId = req.user._id;
    const students = await Student.find({ userId });

    return res.status(200).json({
      success: true,
      user: req.user,
      students,
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user profile.",
      error: error.message,
    });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user._id;
    const { name, phone, vehicle, plateNumber, relation } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (phone !== undefined) updateFields.phone = phone;
    if (vehicle !== undefined) updateFields.vehicle = vehicle;
    if (plateNumber !== undefined) updateFields.plateNumber = plateNumber;
    if (relation !== undefined) updateFields.relation = relation;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true },
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating profile.",
      error: error.message,
    });
  }
}

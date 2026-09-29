import ActivityLog from "../models/ActivityLog.js";

export async function getLogs(req, res) {
  try {
    const logs = await ActivityLog.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error("getLogs error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve logs." });
  }
}

export async function addLog(req, res) {
  try {
    const userId = req.user._id;
    const {
      studentId,
      date,
      time,
      type,
      student,
      transporter,
      vehicle,
      location,
      status,
      lateFee = null,
      verifiedBy = "Curbside Scanner",
      notes = "",
    } = req.body;

    const id = req.body.id || `ACT-${Date.now().toString().slice(-4)}`;

    const newLog = await ActivityLog.create({
      id,
      userId,
      studentId: studentId || null,
      date: date || "Today",
      time: time || "8:00 AM",
      type: type || "General Log",
      student: student || "Student",
      transporter: transporter || req.user.name,
      vehicle: vehicle || req.user.vehicle || "",
      location: location || "Main Gate",
      status: status || "Confirmed",
      lateFee: lateFee || null,
      verifiedBy,
      notes,
    });

    return res.status(201).json({
      success: true,
      log: newLog,
    });
  } catch (error) {
    console.error("addLog error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to record activity log." });
  }
}

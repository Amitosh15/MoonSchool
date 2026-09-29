import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    studentId: {
      type: String,
      default: null,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    student: {
      type: String,
      required: true,
      trim: true,
    },
    transporter: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    lateFee: {
      type: String,
      default: null,
    },
    verifiedBy: {
      type: String,
      default: "Curbside Scanner",
      trim: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    id: false,
    timestamps: false,
  },
);

activityLogSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

activityLogSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;

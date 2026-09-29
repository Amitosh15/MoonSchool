import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
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
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    grade: {
      type: String,
      default: "Grade 1",
      trim: true,
    },
    homeroom: {
      type: String,
      default: "Gr. 1A",
      trim: true,
    },
    teacher: {
      type: String,
      default: "Assigned Staff",
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
    },
    carTag: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContact: {
      type: String,
      default: "",
      trim: true,
    },
    assignedPole: {
      type: Number,
      default: 7,
    },
    assignedLane: {
      type: String,
      default: "Lane 3",
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

studentSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

studentSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;

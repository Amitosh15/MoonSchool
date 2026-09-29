import mongoose from "mongoose";

const authorizedPickupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    relation: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    relation: {
      type: String,
      default: "Parent / Guardian",
      trim: true,
    },
    carTag: {
      type: String,
      default: () => `MS-${Math.floor(100 + Math.random() * 900)}`,
      trim: true,
    },
    vehicle: {
      type: String,
      default: "Family Vehicle",
      trim: true,
    },
    plateNumber: {
      type: String,
      default: "PENDING",
      trim: true,
    },
    defaultTransporter: {
      type: String,
      default: "Parent",
      trim: true,
    },
    authorizedPickups: {
      type: [authorizedPickupSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Configure JSON serialization to expose 'id' matching '_id'
userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

userSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);

export default User;

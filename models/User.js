import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["seeker", "employer"],
        message: "{VALUE} is not supported",
      },
    },
    email: {
      type: String,
      lowercase: true,
      unique: [true, "Email already exists!"],
      required: [true, "Email address is required"],
      match: [/^\S+@\S+\.\S+$/, "Email is not in a valid form"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    verified: {
      type: Boolean,
      required: [true, "Verified is required"],
      default: false,
    },
  },
  { timestamps: true }
);

const User = models?.Users || model("Users", userSchema);

export default User;

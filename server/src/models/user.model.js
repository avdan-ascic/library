import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required!",
  },
  username: {
    type: String,
    trim: true,
    required: "Username is required!",
    maxLength: [16, "Name must have less than 17 characters!"],
  },
  password: {
    type: String,
    required: "Password is required!",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function (next) {
  const userModel = mongoose.model("User", UserSchema);

  const checkUsername = await userModel.findOne({ username: this.username });
  if (checkUsername) next(new Error("Username is already in use!"));

  if (this.password.length < 6)
    next(new Error("Password must contain at least 6 characters!"));

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(new Error(err));
  }
});

export default mongoose.model("User", UserSchema);

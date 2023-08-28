import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.Mixed,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: "Name is required!",
  },
  biography: {
    type: String,
    required: "Biography is required!",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  birthday: {
    type: Date,
    required: "Birthday is required!",
  },
  email: {
    type: String,
    required: "Email is required!",
    match: [/.+\@.+\../, "Please enter a valid email address!"],
  },
});

export default mongoose.model("Author", AuthorSchema);

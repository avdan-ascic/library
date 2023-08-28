import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.Mixed,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  title: {
    type: String,
    required: "Title is required!",
  },
  description: {
    type: String,
    required: "Description is required!",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  pages: {
    type: Number,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: "i",
    required: "Pages is required!",
  },
  price: {
    type: Number,
    get: (v) => parseFloat(v.toFixed(2)),
    set: (v) => parseFloat(v.toFixed(2)),
    required: "Price is required!",
  },
  publisherId: {
    type: mongoose.Schema.Types.Mixed,
    ref: "Publisher",
  },
});

export default mongoose.model("Book", BookSchema);

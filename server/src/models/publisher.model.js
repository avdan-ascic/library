import mongoose from "mongoose";

const lettersOnlyRegex = /^[A-Za-z ]+$/;

const PublisherSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.Mixed,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: "Publisher name is required!",
  },
  address: {
    road: {
      type: String,
      required: "Road is required!",
    },
    zipCode: {
      type: String,
      required: "ZIP Code is required!",
    },
    city: {
      type: String,
      required: "City is required!",
      match: lettersOnlyRegex,
    },
    country: {
      type: String,
      required: "Country is required!",
      match: lettersOnlyRegex,
    },
  },
});

export default mongoose.model("Publisher", PublisherSchema);

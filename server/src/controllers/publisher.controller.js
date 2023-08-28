import Publihser from "../models/publisher.model";
import Book from "../models/book.model";
import mongoose from "mongoose";

const create = async (req, res, next) => {
  try {
    const publisher = new Publihser(req.body);
    await publisher.save();

    return res.status(200).json({ message: "Publisher added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readAll = async (req, res, next) => {
  try {
    const publishers = await Publihser.find({});

    return res.status(200).json({ publishers: publishers });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let publisher;
    if (id.length === 24) {
      publisher = await Publihser.findById(new mongoose.Types.ObjectId(id));
    } else {
      publisher = await Publihser.findById(id);
    }

    return res.status(200).json({ publisher: publisher });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readByName = async (req, res, next) => {
  try {
    const name = req.params.filter;
    const publishers = await Publihser.find({
      name: { $regex: name, $options: "i" },
    });

    return res.status(200).json({ publishers: publishers });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    let publisher;
    if (id.length === 24) {
      publisher = await Publihser.findById(new mongoose.Types.ObjectId(id));
    } else {
      publisher = await Publihser.findById(id);
    }
    if (!publisher)
      return res.status(404).json({ error: "Publisher did not found!" });

    publisher.name = req.body.name;
    publisher.address.road = req.body.address.road;
    publisher.address.zipCode = req.body.address.zipCode;
    publisher.address.city = req.body.address.city;
    publisher.address.country = req.body.address.country;

    await publisher.save();

    return res.status(200).json({ message: "Publisher updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    let books;
    if (id.length === 24) {
      await Publihser.findByIdAndDelete(new mongoose.Types.ObjectId(id));

      books = Book.find({
        publisherId: new mongoose.Types.ObjectId(id),
      }).select("_id");
    } else {
      await Publihser.findByIdAndDelete(id);

      books = Book.find({ publisherId: id }).select("_id");
    }

    for (const book of books) {
      await Book.findByIdAndUpdate(book._id, { publisherId: "" });
    }

    return res.status(200).json({ message: "Publisher removed successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

export default { create, readAll, readById, readByName, update, remove };

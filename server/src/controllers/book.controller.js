import mongoose from "mongoose";

import Book from "../models/book.model";
import AuthBook from "../models/auth_books.model";
import Authors from "../models/author.model";


const create = async (req, res, next) => {
  try {
    let bookObj = JSON.parse(req.body.book);
    const authors = JSON.parse(req.body.authors);

    bookObj.price = parseFloat(bookObj.price);
    if (bookObj.publisherId.length === 24)
      bookObj.publisherId = new mongoose.Types.ObjectId(bookObj.publisherId);

    let book = new Book(bookObj);
    book.image.data = req.file.buffer;
    book.image.contentType = req.file.mimetype;

    await book.save();

    const savedBook = await Book.findOne({ title: bookObj.title }).select(
      "_id"
    );

    for (const auth of authors) {
      const newAuthBook = new AuthBook({
        authorId:
          auth.id.length === 24
            ? new mongoose.Types.ObjectId(auth.id)
            : auth.id,
        bookId: savedBook._id,
      });
      await newAuthBook.save();
    }

    return res.status(200).json({ message: "Book added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readAll = async (req, res, next) => {
  try {
    const books = await Book.find({}).select("title pages price");

    return res.status(200).json({ books: books });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let book;
    let authorIds;
    if (id.length === 24) {
      book = await Book.find({ _id: new mongoose.Types.ObjectId(id) });
      authorIds = await AuthBook.find({
        bookId: new mongoose.Types.ObjectId(id),
      });
    } else {
      book = await Book.find({ _id: id });
      authorIds = await AuthBook.find({ bookId: id });
    }

    const authors = await Authors.find({
      _id: { $in: authorIds.map((authorId) => authorId.authorId) },
    }).select("name");

    return res.status(200).json({ book: book, authors: authors });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readByName = async (req, res, next) => {
  try {
    const title = req.params.filter;
    const books = await Book.find({
      title: { $regex: title, $options: "i" },
    }).select("title pages price");

    return res.status(200).json({ books: books });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readByPubId = async (req, res, next) => {
  try {
    const id = req.params.id;
    let books;
    if (id.length === 24) {
      books = await Book.find({
        publisherId: new mongoose.Types.ObjectId(id),
      }).select("title pages price");
    } else {
      books = await Book.find({ publisherId: id });
    }

    return res.status(200).json({ books: books });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    let book;
    if (id.length === 24) {
      book = await Book.findById(new mongoose.Types.ObjectId(id));
    } else {
      book = await Book.findById(id);
    }
    if (!book) return res.status(404).json({ error: "Book did not found!" });

    let bookObj = JSON.parse(req.body.book);
    bookObj.price = parseFloat(bookObj.price);

    book.title = bookObj.title;
    book.description = bookObj.description;
    book.pages = bookObj.pages;
    book.price = bookObj.price;
    book.publisherId =
      bookObj.length === 24
        ? new mongoose.Types.ObjectId(bookObj.publisherId)
        : bookObj.publisherId;

    if (req.file !== undefined) {
      book.image.data = req.file.buffer;
      book.image.contentType = req.file.mimetype;
    }

    await book.save();

    return res.status(200).json({ message: "Book updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const addAuthor = async (req, res, next) => {
  try {
    let bookId;
    let authorId;
    if (req.params.id.length === 24) {
      bookId = new mongoose.Types.ObjectId(req.params.id);
    } else {
      bookId = req.params.id;
    }
    if (req.body.authorId.length === 24) {
      authorId = new mongoose.Types.ObjectId(req.body.authorId);
    } else {
      authorId = req.body.authorId;
    }

    const newAuthBook = new AuthBook({
      authorId: authorId,
      bookId: bookId,
    });

    await newAuthBook.save();
    return res.status(200).json({ message: "Author added successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (id.length === 24) {
      await Book.findByIdAndDelete(new mongoose.Types.ObjectId(id));
      await AuthBook.deleteMany({ bookId: new mongoose.Types.ObjectId(id) });
    } else {
      await Book.findByIdAndDelete(id);
      await AuthBook.deleteMany({ bookId: id });
    }

    return res.status(200).json({ message: "Book removed successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

export default {
  create,
  readAll,
  readById,
  readByName,
  readByPubId,
  update,
  addAuthor,
  remove,
};

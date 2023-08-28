import Author from "../models/author.model";
import AuthBook from "../models/auth_books.model";
import Books from "../models/book.model";
import mongoose from "mongoose";

const create = async (req, res, next) => {
  try {
    let authObj = JSON.parse(req.body.author);
    const books = JSON.parse(req.body.books);

    let author = new Author(authObj);
    author.image.data = req.file.buffer;
    author.image.contentType = req.file.mimetype;

    await author.save();

    const savedAuthor = await Author.findOne({ name: authObj.name }).select(
      "_id"
    );

    for (const book of books) {
      const newAuthBook = new AuthBook({
        authorId: savedAuthor._id,
        bookId:
          book.id.length === 24
            ? new mongoose.Types.ObjectId(book.id)
            : book.id,
      });
      await newAuthBook.save();
    }

    return res.status(200).json({ message: "Author added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readAll = async (req, res, next) => {
  try {
    const authors = await Author.find({});

    return res.status(200).json({ authors: authors });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let author;
    let bookIds;
    if (id.length === 24) {
      author = await Author.findById(new mongoose.Types.ObjectId(id));
      bookIds = await AuthBook.find({
        authorId: new mongoose.Types.ObjectId(id),
      });
    } else {
      author = await Author.findById(id);
      bookIds = await AuthBook.find({ authorId: id });
    }

    const books = await Books.find({
      _id: { $in: bookIds.map((bookId) => bookId.bookId) },
    }).select("title");

    return res.status(200).json({ author: author, books: books });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readByName = async (req, res, next) => {
  try {
    const name = req.params.filter;
    const authors = await Author.find({
      name: { $regex: name, $options: "i" },
    });

    return res.status(200).json({ authors: authors });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    let author;
    if (id.length === 24) {
      author = await Author.findById(new mongoose.Types.ObjectId(id));
    } else {
      author = await Author.findById(id);
    }

    if (!author)
      return res.status(404).json({ error: "Author did not found!" });

    let authObj = JSON.parse(req.body.author);

    author.name = authObj.name;
    author.biography = authObj.biography;
    author.birthday = authObj.birthday;
    author.email = authObj.email;

    if (req.file !== undefined) {
      author.image.data = req.file.buffer;
      author.image.contentType = req.file.mimetype;
    }

    await author.save();

    return res.status(200).json({ message: "Author updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const addBook = async (req, res, next) => {
  try {
    let id;
    let bookId;
    if (req.params.id.length === 24) {
      id = new mongoose.Types.ObjectId(req.params.id);
    } else {
      id = req.params.id;
    }
    if (req.body.bookId.length === 24) {
      bookId = new mongoose.Types.ObjectId(req.body.bookId);
    } else {
      bookId = req.body.bookId;
    }

    const newAuthBook = new AuthBook({
      authorId: id,
      bookId: bookId,
    });

    await newAuthBook.save();
    return res.status(200).json({ message: "Book added successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id.length === 24) {
      await Author.findByIdAndDelete(new mongoose.Types.ObjectId(id));
      await AuthBook.deleteMany({ authorId: new mongoose.Types.ObjectId(id) });
    } else {
      await Author.findByIdAndDelete(id);
      await AuthBook.deleteMany({ authorId: id });
    }

    return res.status(200).json({ message: "Author deleted successfully." });
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
  update,
  addBook,
  remove,
};

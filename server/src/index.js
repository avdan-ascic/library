import mongoose from "mongoose";

import app from "./App";
import config from "./config";
import { seedData } from "./seed/Seed";
import Book from "./models/book.model";

app.listen(config.port, (err) => {
  if (err) return console.log(err);
  console.log(`Server started on port ${config.port}`);
});

mongoose
  .connect(config.mongo)
  .then(() => console.log("MongoDB connected successfully"))
  .then(async () => {
    const books = await Book.find({});
    if (books.length === 0) seedData();
  })
  .catch((err) => console.log(err));

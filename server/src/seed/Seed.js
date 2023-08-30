// import readXlsxFile from "read-excel-file/node";
// import sharp from "sharp";

// import Author from "../models/author.model";
// import Publisher from "../models/publisher.model";
// import Book from "../models/book.model";
// import Auth_Book from "../models/auth_books.model";
// import User from "../models/user.model";

// const seedData = () => {
//   setTimeout(() => {
//     readXlsxFile("./src/data/LibraryData.xlsx", { sheet: "Authors" })
//       .then(async (rows) => {
//         for (const row of rows) {
//           try {
//             const [id, name, image, biography, birthday, email] = row;

//             if (id === "Id") continue;

//             let newAuthor = new Author({
//               _id: id.toString(),
//               name: name,
//               biography,
//               biography,
//               birthday: birthday,
//               email: email,
//             });

//             const { data } = await sharp(
//               `./src/data/images/authors/${image}.jpg`
//             ).toBuffer({ resolveWithObject: true });

//             Object.assign(newAuthor, {
//               image: {
//                 data: data,
//                 contentType: "image/jpg",
//               },
//             });

//             await newAuthor.save();
//           } catch (err) {
//             console.log(err);
//           }
//         }
//       })
//       .catch((err) => console.log(err));

//     readXlsxFile("./src/data/LibraryData.xlsx", { sheet: "Publishers" })
//       .then(async (rows) => {
//         for (const row of rows) {
//           try {
//             const [id, name, road, zipCode, city, country] = row;

//             if (id === "Id") continue;

//             let newPublisher = new Publisher({
//               _id: id.toString(),
//               name: name,
//               address: {
//                 road: road,
//                 zipCode: zipCode,
//                 city: city,
//                 country: country,
//               },
//             });

//             await newPublisher.save();
//           } catch (err) {
//             console.log(err);
//           }
//         }
//       })
//       .catch((err) => console.log(err));

//     readXlsxFile("./src/data/LibraryData.xlsx", { sheet: "Books" })
//       .then(async (rows) => {
//         for (const row of rows) {
//           try {
//             const [id, title, description, image, pages, price, publisher] =
//               row;

//             if (id === "Id") continue;

//             let newBook = new Book({
//               _id: id.toString(),
//               title: title,
//               description: description,
//               pages: pages,
//               price: price,
//               publisherId: publisher.toString(),
//             });

//             const { data } = await sharp(
//               `./src/data/images/books/${image}.jpg`
//             ).toBuffer({ resolveWithObject: true });

//             Object.assign(newBook, {
//               image: {
//                 data: data,
//                 contentType: "image/jpg",
//               },
//             });

//             await newBook.save();
//           } catch (err) {
//             console.log(err);
//           }
//         }
//       })
//       .catch((err) => console.log(err));

//     readXlsxFile("./src/data/LibraryData.xlsx", { sheet: "AuthBooks" })
//       .then(async (rows) => {
//         for (const row of rows) {
//           try {
//             const [book_id, author_id] = row;

//             if (book_id === "Book_Id") continue;

//             let newAuthBook = new Auth_Book({
//               authorId: author_id.toString(),
//               bookId: book_id.toString(),
//             });

//             await newAuthBook.save();
//           } catch (err) {
//             console.log(err);
//           }
//         }
//       })
//       .catch((err) => console.log(err));

//     readXlsxFile("./src/data/LibraryData.xlsx", { sheet: "Users" })
//       .then(async (rows) => {
//         for (const row of rows) {
//           try {
//             const [id, name, username, password, role] = row;

//             if (id === "Id") continue;

//             let newUser = new User({
//               name: name,
//               username: username,
//               password: password,
//               role: role,
//             });

//             await newUser.save();
//           } catch (err) {
//             console.log(err);
//           }
//         }
//       })
//       .catch((err) => console.log(err));
//   }, 2000);
// };

// export { seedData };

import exceljs from "exceljs";
import sharp from "sharp";

import Author from "../models/author.model";
import Publisher from "../models/publisher.model";
import Book from "../models/book.model";
import Auth_Book from "../models/auth_books.model";
import User from "../models/user.model";

const seedData = async () => {
  try {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile("./src/data/LibraryData.xlsx");

    const authorSheet = workbook.getWorksheet("Authors");
    authorSheet.eachRow(async (row) => {
      const [id, name, image, biography, birthday, email] = row.values;

      if (id !== "Id") {
        let newAuthor = new Author({
          _id: id.toString(),
          name: name,
          biography: biography,
          birthday: birthday,
          email: email,
        });

        const imageBuffer = await sharp(
          `./src/data/images/authors/${image}.jpg`
        ).toBuffer();

        Object.assign(newAuthor, {
          image: {
            data: imageBuffer,
            contentType: "image/jpg",
          },
        });

        await newAuthor.save();
      }
    });

    const publisherSheet = workbook.getWorksheet("Publishers");
    publisherSheet.eachRow(async (row) => {
      const [id, name, road, zipCode, city, country] = row.values;

      if (id !== "Id") {
        let newPublisher = new Publisher({
          _id: id.toString(),
          name: name,
          address: {
            road: road,
            zipCode: zipCode,
            city: city,
            country: country,
          },
        });

        await newPublisher.save();
      }
    });

    const bookSheet = workbook.getWorksheet("Books");
    bookSheet.eachRow(async (row) => {
      const [id, title, description, image, pages, price, publisher] =
        row.values;

      if (id !== "Id") {
        let newBook = new Book({
          _id: id.toString(),
          title: title,
          description: description,
          pages: pages,
          price: price,
          publisherId: publisher.toString(),
        });

        const imageBuffer = await sharp(
          `./src/data/images/books/${image}.jpg`
        ).toBuffer();

        Object.assign(newBook, {
          image: {
            data: imageBuffer,
            contentType: "image/jpg",
          },
        });

        await newBook.save();
      }
    });

    const authBookSheet = workbook.getWorksheet("AuthBooks");
    authBookSheet.eachRow(async (row) => {
      const [book_id, author_id] = row.values;

      if (book_id !== "Book_Id") {
        let newAuthBook = new Auth_Book({
          authorId: author_id.toString(),
          bookId: book_id.toString(),
        });

        await newAuthBook.save();
      }
    });

    const userSheet = workbook.getWorksheet("Users");
    userSheet.eachRow(async (row) => {
      const [id, name, username, password, role] = row.values;

      if (id !== "Id") {
        let newUser = new User({
          name: name,
          username: username,
          password: password,
          role: role,
        });

        await newUser.save();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export { seedData };

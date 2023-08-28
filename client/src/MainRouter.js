import { Routes, Route } from "react-router-dom";

import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import Home from "./components/core/Home";
import OurTeam from "./components/library/OurTeam";
import Login from "./components/user/Login";
import Publishers from "./components/library/Publishers";
import Publisher from "./components/library/Publisher";
import AddPublisher from "./components/library/AddPublisher";
import EditPublisher from "./components/library/EditPublisher";
import Books from "./components/library/Books";
import Book from "./components/library/Book";
import AddBook from "./components/library/AddBook";
import EditBook from "./components/library/EditBook";
import Authors from "./components/library/Authors";
import Author from "./components/library/Author";
import AddAuthor from "./components/library/AddAuthor";
import EditAuthor from "./components/library/EditAuthor";

const MainRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/publisher/:id" element={<Publisher />} />
        <Route path="/edit-publisher/:id" element={<EditPublisher />} />
        <Route path="/add-publisher" element={<AddPublisher />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/add-author" element={<AddAuthor />} />
        <Route path="/edit-author/:id" element={<EditAuthor />} />
      </Routes>
      <Footer />
    </>
  );
};

export default MainRouter;

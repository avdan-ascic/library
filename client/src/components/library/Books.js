import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Header,
  Table,
  Search,
  Container,
  Modal,
  Icon,
  Button,
} from "semantic-ui-react";
import { UserContext } from "../../App";
import { readAll, readByName, remove } from "../../api/book-api";
import { StyledDiv } from "../../styled";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [delBook, setDelBook] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    readAll()
      .then((data) => setBooks(data.books))
      .catch((err) => console.log(err));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search === "") {
      readAll()
        .then((data) => setBooks(data.books))
        .catch((err) => console.log(err));
    } else {
      readByName(search)
        .then((data) => setBooks(data.books))
        .catch((err) => console.log(err));
    }
  }, [search]);

  const handleDeleteButton = (book) => {
    setDelBook(book);
    setOpen(true);
  };
  const handleDelete = () => {
    remove(delBook._id)
      .then(() => {
        setOpen(false);
        setBooks(books.filter((book) => book._id !== delBook._id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container
        style={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <StyledDiv>
          <Header size="large" style={{ margin: 0, color: "#204e59" }}>
            Books
          </Header>
          <Search
            placeholder="Search..."
            onSearchChange={handleSearchChange}
            value={search}
            showNoResults={false}
          />
        </StyledDiv>
        {books && books.length > 0 ? (
          <Table celled unstackable selectable style={{ marginBottom: "5rem" }}>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Pages</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                {user.role === "admin" && (
                  <Table.HeaderCell>
                    <Link to="/add-book" style={{ color: "green" }}>
                      <Icon name="plus" /> Add
                    </Link>
                  </Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {books.map((book, index) => {
                return (
                  <Table.Row key={index}>
                      <Table.Cell
                      onClick={() => navigate(`/book/${book._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {book._id}
                    </Table.Cell>
                    <Table.Cell
                      onClick={() => navigate(`/book/${book._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {book.title}
                    </Table.Cell>
                    <Table.Cell
                      onClick={() => navigate(`/book/${book._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {book.pages}
                    </Table.Cell>
                    <Table.Cell
                      onClick={() => navigate(`/book/${book._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {book.price} BAM
                    </Table.Cell>
                    {user.role === "admin" && (
                      <Table.Cell>
                        <Link
                          to={`/edit-book/${book._id}`}
                          style={{ marginRight: "0.5em", color: "orange" }}
                        >
                          <Icon name="edit" />
                          Edit
                        </Link>
                        |
                        <Link
                          onClick={() => handleDeleteButton(book)}
                          style={{ marginLeft: "0.5em", color: "red" }}
                        >
                          <Icon name="remove" />
                          Delete
                        </Link>
                      </Table.Cell>
                    )}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        ) : (
          <p style={{ fontStyle: "italic" }}>No books found.</p>
        )}
      </Container>

      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Header icon>
          <Icon name="trash alternate" color="red" />
          Delete Book
        </Header>
        <Modal.Content>
          <p style={{ textAlign: "center" }}>
            Are you sure you want to delete <strong>{delBook?.title}</strong> ?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic inverted onClick={() => setOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="red" inverted onClick={handleDelete}>
            <Icon name="checkmark" /> Delete
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Books;

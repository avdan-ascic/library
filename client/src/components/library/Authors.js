import { useState, useContext, useEffect } from "react";
import {
  Header,
  Table,
  Search,
  Modal,
  Icon,
  Container,
  Button,
  Image,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { binaryToBase64 } from "../../helpers/image-format-converter";
import { UserContext } from "../../App";
import { readAll, readByName, remove } from "../../api/author-api";
import { StyledDiv } from "../../styled";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [delAuthor, setDelAuthor] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    readAll()
      .then((data) => setAuthors(data.authors))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    if (search === "") {
      readAll()
        .then((data) => setAuthors(data.authors))
        .catch((err) => console.log(err));
    } else {
      readByName(search)
        .then((data) => setAuthors(data.authors))
        .catch((err) => console.log(err));
    }
  }, [search]);

  const handleDeleteButton = (author) => {
    setDelAuthor(author);
    setOpen(true);
  };
  const handleDelete = () => {
    remove(delAuthor._id)
      .then(() => {
        setOpen(false);
        setAuthors(authors.filter((author) => author._id !== delAuthor._id));
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
            Authors
          </Header>
          <Search
            placeholder="Search..."
            onSearchChange={handleSearchChange}
            value={search}
            showNoResults={false}
          />
        </StyledDiv>
        {(authors && authors.length) > 0 ? (
          <div style={{ width: "100%", overflowX: "auto" }}>
            <Table
              celled
              unstackable
              selectable
              style={{ marginBottom: "5rem" }}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Image</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>DOB</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  {user.role === "admin" && (
                    <Table.HeaderCell>
                      <Link to="/add-author" style={{ color: "green" }}>
                        <Icon name="plus" />
                        Add
                      </Link>
                    </Table.HeaderCell>
                  )}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {authors.map((author, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell
                        onClick={() => navigate(`/author/${author._id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <Image
                          src={`data:${
                            author.image.contentType
                          };base64,${binaryToBase64(author.image.data.data)}`}
                          rounded
                          size="tiny"
                          style={{ marginLeft: "auto", marginRight: "auto" }}
                        />
                      </Table.Cell>
                      <Table.Cell
                        onClick={() => navigate(`/author/${author._id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        {author.name}
                      </Table.Cell>
                      <Table.Cell
                        onClick={() => navigate(`/author/${author._id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        {format(new Date(author.birthday), "dd/MM/yyyy")}
                      </Table.Cell>
                      <Table.Cell
                        onClick={() => navigate(`/author/${author._id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        {author.email}
                      </Table.Cell>
                      {user.role === "admin" && (
                        <Table.Cell>
                          <Link
                            to={`/edit-author/${author._id}`}
                            style={{ marginRight: "0.5em", color: "orange" }}
                          >
                            <Icon name="edit" />
                            Edit
                          </Link>
                          |
                          <Link
                            onClick={() => handleDeleteButton(author)}
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
          </div>
        ) : (
          <p style={{ fontStyle: "italic" }}>No authors found.</p>
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
          Delete author
        </Header>
        <Modal.Content>
          <p style={{ textAlign: "center" }}>
            Are you sure you want to delete <strong>{delAuthor?.name}</strong> ?
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

export default Authors;

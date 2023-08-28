import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Header,
  Table,
  Search,
  Modal,
  Icon,
  Button,
  Container,
} from "semantic-ui-react";
import { UserContext } from "../../App";
import { readAll, readByName, remove } from "../../api/publisher-api";
import { StyledDiv } from "../../styled";

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [delPublisher, setDelPublisher] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    readAll()
      .then((data) => setPublishers(data.publishers))
      .catch((err) => console.log(err));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    if (search === "") {
      readAll()
        .then((data) => setPublishers(data.publishers))
        .catch((err) => console.log(err));
    } else {
      readByName(search)
        .then((data) => setPublishers(data.publishers))
        .catch((err) => console.log(err));
    }
  }, [search]);

  const handleDeleteButton = (pub) => {
    setDelPublisher(pub);
    setOpen(true);
  };
  const handleDelete = () => {
    remove(delPublisher._id)
      .then(() => {
        setOpen(false);
        setPublishers(publishers.filter((pub) => pub._id !== delPublisher._id));
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
            Publishers
          </Header>
          <Search
            placeholder="Search..."
            onSearchChange={handleSearchChange}
            value={search}
            showNoResults={false}
          />
        </StyledDiv>
        {publishers && publishers.length > 0 ? (
          <Table celled unstackable selectable style={{ marginBottom: "5rem" }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Country</Table.HeaderCell>
                {user.role === "admin" && (
                  <Table.HeaderCell>
                    <Link to="/add-publisher" style={{ color: "green" }}>
                      <Icon name="plus" />
                      Add
                    </Link>
                  </Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {publishers.map((pub, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell
                      onClick={() => navigate(`/publisher/${pub._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {pub.name}
                    </Table.Cell>
                    <Table.Cell
                      onClick={() => navigate(`/publisher/${pub._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {pub.address.country}
                    </Table.Cell>
                    {user.role === "admin" && (
                      <Table.Cell>
                        <Link
                          to={`/edit-publisher/${pub._id}`}
                          style={{ marginRight: "0.5em", color: "orange" }}
                        >
                          <Icon name="edit" />
                          Edit
                        </Link>
                        |
                        <Link
                          onClick={() => handleDeleteButton(pub)}
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
          <p>No publishers found.</p>
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
          Delete Publisher
        </Header>
        <Modal.Content>
          <p style={{ textAlign: "center" }}>
            Are you sure you want to delete
            <strong>{delPublisher?.name}</strong> ?
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

export default Publishers;

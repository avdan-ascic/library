import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Table, Container, Header } from "semantic-ui-react";
import { readById } from "../../api/publisher-api";
import { readByPubId } from "../../api/book-api";

const Publisher = () => {
  const [publisher, setPublisher] = useState({});
  const [books, setBooks] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    readById(params.id)
      .then((data) => {
        setPublisher(data.publisher);
      })
      .catch((err) => console.log(err));

    readByPubId(params.id)
      .then((data) => setBooks(data.books))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      style={{
        marginTop: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header size="huge" style={{ color: "#204e59" }}>
        {publisher?.name}
      </Header>

      <Table celled unstackable selectable style={{ marginTop: "2rem" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2" textAlign="center">
              Address
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Road</Table.Cell>
            <Table.Cell>{publisher?.address?.road}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ZIP Code</Table.Cell>
            <Table.Cell>{publisher?.address?.zipCode}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>City</Table.Cell>
            <Table.Cell>{publisher?.address?.city}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Country</Table.Cell>
            <Table.Cell>{publisher?.address?.country}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Header size="medium" style={{ marginTop: "3rem" }}>
        Books by {publisher?.name}
      </Header>
      {books && books.length > 0 ? (
        <Table
          celled
          unstackable
          selectable
          style={{ marginTop: "2rem", marginBottom: "5rem" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Pages</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
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
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <p>{publisher.name} has no books.</p>
      )}
    </Container>
  );
};

export default Publisher;

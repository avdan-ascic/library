import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  Header,
  Grid,
  Image,
  Button,
  Container,
  List,
} from "semantic-ui-react";
import { readById } from "../../api/book-api";
import { readById as readPubById } from "../../api/publisher-api";
import { binaryToBase64 } from "../../helpers/image-format-converter";

const Book = () => {
  const [book, setBook] = useState();
  const [authors, setAuthors] = useState([]);
  const [publisher, setPublisher] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    readById(params.id)
      .then((data) => {
        setBook(data.book[0]);
        setAuthors(data.authors);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (book) {
      readPubById(book.publisherId)
        .then((data) => setPublisher(data.publisher))
        .catch((err) => console.log(err));
    }
  }, [book]);

  return (
    <Container
      style={{
        marginTop: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header size="huge" style={{ textAlign: "center", color: "#204e59" }}>
        {book?.title}
      </Header>
      <>
        <Grid style={{ marginTop: "3rem" }}>
          <Grid.Column width={5}>
            <Image
              src={`data:${book?.image?.contentType};base64,${binaryToBase64(
                book?.image?.data?.data
              )}`}
              size="huge"
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <p>
              <strong>Pages:</strong> {book?.pages}
            </p>
            <p>
              <strong>Price:</strong> BAM {book?.price}
            </p>
            <p>
              <strong>Publisher:</strong>{" "}
              <Link to={`/publisher/${publisher?._id}`}>{publisher?.name}</Link>
            </p>
            <strong>Authors:</strong>{" "}
            <List bulleted style={{ marginTop: 0 }}>
              {authors.length > 0 &&
                authors.map((author, index) => {
                  return (
                    <List.Item key={index}>
                      <Link to={`/author/${author._id}`}>{author.name}</Link>
                    </List.Item>
                  );
                })}
            </List>
          </Grid.Column>
        </Grid>
        <p style={{ marginTop: "2rem" }}>{book?.description}</p>
      </>
      <Button
        style={{
          marginTop: "2em",
          backgroundColor: "#204e59",
          width: "250px",
        }}
        secondary
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </Container>
  );
};

export default Book;

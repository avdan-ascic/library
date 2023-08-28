import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
  Header,
  Grid,
  Image,
  List,
  Container,
  Button,
} from "semantic-ui-react";
import { format } from "date-fns";
import { readById } from "../../api/author-api";
import { binaryToBase64 } from "../../helpers/image-format-converter";

const Author = () => {
  const [author, setAuthor] = useState();
  const [books, setBooks] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    readById(params.id)
      .then((data) => {
        setAuthor(data.author);
        setBooks(data.books);
      })
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
      {author && (
        <>
          <Header size="huge" style={{ textAlign: "center", color: "#204e59" }}>
            {author?.name}
          </Header>
          <>
            <Grid style={{ marginTop: "3rem" }}>
              <Grid.Column width={8}>
                <Image
                  src={`data:${
                    author?.image?.contentType
                  };base64,${binaryToBase64(author?.image?.data?.data)}`}
                  size="big"
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <p>
                  <strong>Birthday:</strong>
                  {format(new Date(author.birthday), "dd/MM/yyyy")}
                </p>
                <p>
                  <strong>Email:</strong> {author?.email}
                </p>
                <strong>Books:</strong>
                <List bulleted style={{ marginTop: "0.5em" }}>
                  {books.length > 0 &&
                    books.map((book, index) => {
                      return (
                        <List.Item key={index}>
                          <Link
                            to={`/book/${book._id}`}
                            style={{ color: "#204e59" }}
                          >
                            {book.title}
                          </Link>
                        </List.Item>
                      );
                    })}
                </List>
              </Grid.Column>
            </Grid>
            <p style={{ marginTop: "2rem" }}>{author?.biography}</p>
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
        </>
      )}
    </Container>
  );
};

export default Author;

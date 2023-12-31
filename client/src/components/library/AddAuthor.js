import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  Icon,
  Header,
  Container,
  TextArea,
  Dropdown,
  Grid,
  List,
  Input,
  Image,
} from "semantic-ui-react";
import { create } from "../../api/author-api";
import { readAll as readBooks } from "../../api/book-api";

const AddAuthor = () => {
  const [values, setValues] = useState({
    name: "",
    biography: "",
    birthday: "",
    email: "",
    error: "",
    redirect: false,
  });
  const [authImage, setAuthImage] = useState();
  const [displayImage, setDisplayImage] = useState();
  const [books, setBooks] = useState([]);
  const [bookOptions, setBookOptions] = useState([]);
  const [addedBooks, setAddedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    readBooks()
      .then((data) => setBooks(data.books))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let tempOpts = [];
    books.map((book) => {
      return tempOpts.push({
        key: book._id,
        text: book.title,
        value: book.title,
      });
    });
    setBookOptions(tempOpts);
  }, [books]);
  const handleAddBook = (e, data) => {
    const book = books.filter((book) => book.title === data.value);

    setAddedBooks([...addedBooks, { id: book[0]._id, title: book[0].title }]);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.name)
      return setValues({
        ...values,
        error: "Name is required",
        redirect: false,
      });
    if (!values.biography)
      return setValues({
        ...values,
        error: "Biography is required",
        redirect: false,
      });
    if (!values.birthday)
      return setValues({
        ...values,
        error: "Birthday is required",
        redirect: false,
      });
    if (!values.email)
      return setValues({
        ...values,
        error: "Email is required",
        redirect: false,
      });

    if (!authImage) {
      setValues({
        ...values,
        error: "Author image is required",
        redirect: false,
      });
      return;
    }

    if (addedBooks.length === 0) {
      setValues({
        ...values,
        error: "At least one book is required",
        redirect: false,
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", authImage);
    formData.append("author", JSON.stringify(values));
    formData.append("books", JSON.stringify(addedBooks));

    create(formData)
      .then((data) => {
        if (data.response.data.error)
          return setValues({
            ...values,
            error: data.response.data.error,

            redirect: false,
          });
        else {
          setValues({ ...values, error: "", redirect: true });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    setAuthImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setDisplayImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (values.redirect) {
      return navigate("/authors");
    }
    // eslint-disable-next-line
  }, [values.redirect]);

  return (
    <Container
      style={{
        marginTop: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header size="large" style={{ marginBottom: "2rem", color: "#204e59" }}>
        Add Author
      </Header>
      <>
        <Grid style={{ width: "100%" }}>
          <Grid.Column
            width={8}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Form style={{ width: "80%" }}>
              <Form.Field>
                <label>Name</label>
                <input value={values.name} onChange={handleChange("name")} />
              </Form.Field>
              <Form.Field>
                <label>Biography</label>
                <TextArea
                  value={values.biography}
                  onChange={handleChange("biography")}
                />
              </Form.Field>
              <Form.Field>
                <label>Birthday</label>
                <input
                  type="date"
                  max="2015-12-31"
                  value={values.birthday}
                  onChange={handleChange("birthday")}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input value={values.email} onChange={handleChange("email")} />
              </Form.Field>
            </Form>
          </Grid.Column>

          <Grid.Column
            width={8}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {displayImage && (
              <Image
                src={displayImage}
                size="medium"
                style={{
                  maxHeight: "250px",
                  objectFit: "contain",
                  marginBottom: "2rem",
                }}
              />
            )}
            <Input
              style={{ marginBottom: "3rem" }}
              type="file"
              onChange={handleImageChange}
            />
            <Dropdown
              button
              className="icon"
              floating
              labeled
              icon="book"
              options={bookOptions}
              search
              onChange={(e, data) => handleAddBook(e, data)}
              text="Add Book"
            />
            <List bulleted>
              {addedBooks.length > 0 &&
                addedBooks.map((book, index) => {
                  return (
                    <List.Item key={index}>
                      <Link to={`/author/${book.id}`}>{book.title}</Link>
                    </List.Item>
                  );
                })}
            </List>
          </Grid.Column>
          <Container>
            {values.error && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem",
                }}
              >
                <Icon name="exclamation" color="red" />{" "}
                <p style={{ color: "red" }}>{values.error}</p>
              </div>
            )}
          </Container>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "2rem",
            }}
          >
            <Button.Group>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </Button>
              <Button.Or />
              <Button
                style={{ backgroundColor: "#204e59", color: "#fff" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Button.Group>
          </div>
        </Grid>
      </>
    </Container>
  );
};

export default AddAuthor;

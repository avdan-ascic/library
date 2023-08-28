import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  Icon,
  Header,
  TextArea,
  Dropdown,
  Grid,
  Container,
  List,
  Input,
  Image,
} from "semantic-ui-react";
import { create } from "../../api/book-api";
import { readAll } from "../../api/publisher-api";
import { readAll as readAuthors } from "../../api/author-api";

const AddBook = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    pages: "",
    price: "",
    publisherId: null,
    error: "",
    redirect: false,
  });
  const [bookImage, setBookImage] = useState();
  const [displayImage, setDisplayImage] = useState();
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [pubOptions, setPubOptions] = useState([]);
  const [authOptions, setAuthOptions] = useState([]);
  const [addedAuthors, setAddedAuthors] = useState([]);
  const [selectedPub, setSelectedPub] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    readAll()
      .then((data) => setPublishers(data.publishers))
      .catch((err) => console.log(err));

    readAuthors()
      .then((data) => setAuthors(data.authors))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let tempOpts = [];
    publishers.map((pub) => {
      return tempOpts.push({ key: pub._id, text: pub.name, value: pub.name });
    });
    setPubOptions(tempOpts);
  }, [publishers]);

  const handleSelectPublisher = (e, data) => {
    setSelectedPub(data.value);
    const pub = publishers.filter((pub) => pub.name === data.value);
    setValues({ ...values, publisherId: pub[0]._id });
  };

  useEffect(() => {
    let tempOpts = [];
    authors.map((auth) => {
      return tempOpts.push({
        key: auth._id,
        text: auth.name,
        value: auth.name,
      });
    });
    setAuthOptions(tempOpts);
  }, [authors]);

  const handleAddAuthor = (e, data) => {
    const author = authors.filter((auth) => auth.name === data.value);
    console.log(author[0]);

    setAddedAuthors([
      ...addedAuthors,
      { id: author[0]._id, name: author[0].name },
    ]);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", bookImage);
    formData.append("book", JSON.stringify(values));
    formData.append("authors", JSON.stringify(addedAuthors));

    create(formData)
      .then((data) => {
        if (data?.response?.data?.error)
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

  const handleImageChange = (event) => {
    setBookImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setDisplayImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (values.redirect) {
      return navigate("/books");
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
        Add Book
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
                <label>Title</label>
                <input value={values.title} onChange={handleChange("title")} />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <TextArea
                  value={values.description}
                  onChange={handleChange("description")}
                />
              </Form.Field>
              <Form.Field>
                <label>Pages</label>
                <input value={values.pages} onChange={handleChange("pages")} />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input value={values.price} onChange={handleChange("price")} />
              </Form.Field>
              <Form.Field>
                <label>Publisher</label>
                <Dropdown
                  floating
                  selection
                  fluid
                  placeholder="Select Publisher"
                  value={selectedPub}
                  options={pubOptions}
                  onChange={(e, data) => handleSelectPublisher(e, data)}
                />
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
              icon="user plus"
              options={authOptions}
              search
              onChange={(e, data) => handleAddAuthor(e, data)}
              text="Add Author"
            />
            <List bulleted>
              {addedAuthors.length > 0 &&
                addedAuthors.map((author, index) => {
                  return (
                    <List.Item key={index}>
                      <Link to={`/author/${author.id}`}>{author.name}</Link>
                    </List.Item>
                  );
                })}
            </List>
          </Grid.Column>

          {values.error && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1rem",
              }}
            >
              <Icon name="exclamation circle" color="red" />{" "}
              <p style={{ color: "red" }}>{values.error}</p>
            </div>
          )}

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

export default AddBook;

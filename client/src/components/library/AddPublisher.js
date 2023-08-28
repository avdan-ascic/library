import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Form, Container, Icon, Header } from "semantic-ui-react";
import { create } from "../../api/publisher-api";

const AddPublisher = () => {
  const [values, setValues] = useState({
    name: "",
    address: {
      road: "",
      zipCode: "",
      city: "",
      country: "",
    },
    error: "",
    redirect: false,
  });
  const navigate = useNavigate();

  const handleChangeName = (event) => {
    setValues({ ...values, name: event.target.value });
  };
  const handleChangeAddress = (name) => (event) => {
    setValues({
      ...values,
      address: { ...values.address, [name]: event.target.value },
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.name)
      return setValues({
        ...values,
        error: "Name is required!",
        redirect: false,
      });
    if (!values.address.road)
      return setValues({
        ...values,
        error: "Road is required!",
        redirect: false,
      });
    if (!values.address.zipCode)
      return setValues({
        ...values,
        error: "ZIP Code is required!",
        redirect: false,
      });
    if (!values.address.city)
      return setValues({
        ...values,
        error: "City is required!",
        redirect: false,
      });
    if (!values.address.country)
      return setValues({
        ...values,
        error: "Country is required!",
        redirect: false,
      });

    create(values)
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

  useEffect(() => {
    if (values.redirect) {
      return navigate("/publishers");
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
        Publisher
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input value={values.name} onChange={handleChangeName} />
        </Form.Field>
        <Form.Field>
          <label>Road</label>
          <input
            value={values.address.road}
            onChange={handleChangeAddress("road")}
          />
        </Form.Field>
        <Form.Field>
          <label>ZIP Code</label>
          <input
            value={values.address.zipCode}
            onChange={handleChangeAddress("zipCode")}
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input
            value={values.address.city}
            onChange={handleChangeAddress("city")}
          />
        </Form.Field>
        <Form.Field>
          <label>Country</label>
          <input
            value={values.address.country}
            onChange={handleChangeAddress("country")}
          />
        </Form.Field>

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

        <div style={{ display: "flex", justifyContent: "center" }}>
        <Button.Group style={{marginTop:"3rem"}}>
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
      </Form>
    </Container>
  );
};

export default AddPublisher;

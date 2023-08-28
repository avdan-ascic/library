import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Icon, Header, Container } from "semantic-ui-react";

import { UserContext } from "../../App";
import { login } from "../../api/user-api";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    redirect: false,
  });
  const { loggedIn, setLoggedIn, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.username)
      return setValues({
        ...values,
        error: "Username is required!",
        redirect: false,
      });
    if (!values.password)
      return setValues({
        ...values,
        error: "Password is required!",
        redirect: false,
      });

    login(values)
      .then((data) => {
        if (data.error)
          return setValues({
            ...values,
            error: data.error,
            redirect: false,
          });
        else {
          setLoggedIn(true);
          setUser({
            id: data.user.data,
            name: data.user.name,
            role: data.user.role,
          });
          setValues({ ...values, error: "", redirect: true });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (values.redirect) {
      return navigate("/");
    }
    // eslint-disable-next-line
  }, [values.redirect]);

  useEffect(() => {
    if (loggedIn) return navigate("/publishers");
    // eslint-disable-next-line
  }, [loggedIn]);

  return (
    <Container
      style={{
        marginTop: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header size="large" style={{ marginBottom: "2rem", color: "#204e59" }}>
        Authentication
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          icon="user"
          iconPosition="left"
          label="Username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange("username")}
        />

        <Form.Input
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          type="password"
          value={values.password}
          onChange={handleChange("password")}
        />
        {values.error && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem",
            }}
          >
            <Icon name="exclamation" color="red" />
            <p style={{ color: "red" }}>{values.error}</p>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            secondary
            style={{ backgroundColor: "#204e59" }}
          >
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;

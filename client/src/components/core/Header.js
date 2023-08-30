import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Menu, Image, Icon } from "semantic-ui-react";
import { UserContext } from "../../App";
import { logout } from "../../api/user-api";
import Logo from "../../assets/images/logo1.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const { loggedIn, setLoggedIn, setUser } = useContext(UserContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        setLoggedIn(false);
        setUser({ id: "", name: "", role: "" });
        sessionStorage.clear();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // eslint-disable-next-line
  useEffect(() => {
    setActiveItem(location.pathname);
  });

  return (
    <Menu
      inverted
      style={{
        borderRadius: 0,
        border: "none",
        backgroundColor: "#204e59",
        height: "8.5vh",
      }}
    >
      <Menu.Item name="logo">
        <Image src={Logo} size="tiny" />
      </Menu.Item>
      <Menu.Menu position="right">
        {!loggedIn ? (
          <>
            <Menu.Item
              name="home"
              active={activeItem === "/"}
              onClick={() => {
                setActiveItem("/");
                navigate("/");
              }}
            >
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item
              name="our team"
              active={activeItem === "/our-team"}
              onClick={() => {
                setActiveItem("/our-team");
                navigate("/our-team");
              }}
            >
              <Icon name="users" />
              Our Team
            </Menu.Item>
            <Menu.Item
              name="login"
              active={activeItem === "/login"}
              onClick={() => {
                setActiveItem("/login");
                navigate("/login");
              }}
            >
              <Icon name="sign-in" />
              Login
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item
              name="publishers"
              active={activeItem.includes("/publishers")}
              onClick={() => {
                setActiveItem("/publishers");
                navigate("/publishers");
              }}
            >
              Publishers
            </Menu.Item>
            <Menu.Item
              name="books"
              active={activeItem.includes("/books")}
              onClick={() => {
                setActiveItem("/books");
                navigate("/books");
              }}
            >
              Books
            </Menu.Item>
            <Menu.Item
              name="authors"
              active={activeItem.includes("/authors")}
              onClick={() => {
                setActiveItem("/authors");
                navigate("/authors");
              }}
            >
              Authors
            </Menu.Item>
            <Menu.Item name="logout" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Header;

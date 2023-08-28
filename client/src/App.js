import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useState, createContext, useEffect } from "react";

import MainRouter from "./MainRouter";

axios.defaults.withCredentials = true;

export const UserContext = createContext(null);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedin = sessionStorage.getItem("loggedIn");
    return storedLoggedin ? JSON.parse(storedLoggedin) : false;
  });
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { id: "", name: "", role: "" };
  });

  useEffect(() => {
    sessionStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [loggedIn, user]);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;

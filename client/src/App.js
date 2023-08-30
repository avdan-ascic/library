import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useState, createContext, useEffect } from "react";

import MainRouter from "./MainRouter";
import { isAuth } from "./helpers/auth";

axios.defaults.withCredentials = true;

export const UserContext = createContext(null);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    isAuth(setLoggedIn, setUser);
  }, []);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;

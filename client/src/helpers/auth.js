import { authenticate } from "../api/user-api";

const isAuth = (setLoggedIn, setUser) => {
  authenticate()
    .then((data) => {
      if (data?.user) {
        if (!setLoggedIn && !setUser) return;
        setLoggedIn(true);
        setUser({
          id: data.user.data,
          name: data.user.name,
          role: data.user.role,
        });
      } else {
        return false;
      }
    })
    .catch((err) => console.log(err));
};

export { isAuth };

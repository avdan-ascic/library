import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const login = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/users/login`,
      data,
      {
        headers,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const authenticate = async () => {
  try {
    const response = await axios.get(
      `${baseUrl.server}/api/users/authenticate`,
      {
        headers,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const logout = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/users/logout`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { login, authenticate, logout };

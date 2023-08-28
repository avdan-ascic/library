import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const create = async (data) => {
  try {
    const response = await axios.post(`${baseUrl.server}/api/authors`, data, {
      "Content-Type": "Multipart/form-data",
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readAll = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/authors`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/authors/${id}`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readByName = async (name) => {
  try {
    const response = await axios.get(
      `${baseUrl.server}/api/authors/find/${name}`,
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

const update = async (data, id) => {
  try {
    const response = await axios.put(
      `${baseUrl.server}/api/authors/${id}`,
      data,
      {
        "Content-Type": "Multipart/form-data",
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const addBook = async (data, id) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/authors/${id}`,
      data,
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

const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl.server}/api/authors/${id}`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { create, readAll, readById, readByName, update, addBook, remove };

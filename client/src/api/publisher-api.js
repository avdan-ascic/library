import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const create = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/publishers`,
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

const readAll = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/publishers`, {
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
    const response = await axios.get(`${baseUrl.server}/api/publishers/${id}`, {
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
      `${baseUrl.server}/api/publishers/find/${name}`,
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
      `${baseUrl.server}/api/publishers/${id}`,
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
    const response = await axios.delete(
      `${baseUrl.server}/api/publishers/${id}`,
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

export { create, readAll, readById, readByName, update, remove };

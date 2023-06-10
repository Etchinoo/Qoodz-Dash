import axios from "axios";

const getToken = () => localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost",
  headers: {
    Authorization: "Basic " + getToken,
  },
});

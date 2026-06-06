import axios from "axios";

const API = axios.create({
  baseURL: "https://crud-app-brta.onrender.com",
});

export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "https://crud-app-3-tchf.onrender.com",
});

export default API;
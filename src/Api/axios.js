import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-api-f8sq.onrender.com",
});

export { axiosInstance };
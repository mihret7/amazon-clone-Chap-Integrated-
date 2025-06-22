import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Update this to your server URL
});

export { axiosInstance };
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-clone-chap-integrated-1.onrender.com",
});

export { axiosInstance };
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

export default $api;
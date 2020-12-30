import axios from "axios";
import config from "./config";

axios.defaults.baseURL = config.apiUrl;
const urlenc = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

export const authenticateUser = obj => {
  const requestUrl = "login";
  return axios.post(requestUrl, obj,urlenc);
};

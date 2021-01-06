import axios from "axios";
import config from "./config";
import qs from "querystring";

axios.defaults.baseURL = config.apiUrl;
const urlenc = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'X-OBSERVATORY-AUTH': sessionStorage.getItem('token')
    }
  }

export const authenticateUser = obj => {
  const requestUrl = "login";
  //alert(qs.stringify(obj))
  return axios.post(requestUrl, qs.stringify(obj),urlenc);
};

export const logoutUser = () => {
  const requestUrl = "logout";
  return axios.post(requestUrl);
};



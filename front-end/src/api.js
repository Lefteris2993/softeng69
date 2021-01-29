import axios from "axios";
import config from "./config";
import qs from "querystring";

axios.defaults.baseURL = config.apiUrl;
const urlenc = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

//https://localhost:8765/evcharge/api/sessionsforbill
//post token stringified
//expect for this specific users all sessions as json
//ARRAY IN THIS FORMAT
// [
//   {
//       "date": "3/11/2018",                        
//       "energy": "657",                        
//       "money": "20"
//   },
//   {
//       "date": "5/12/2018",
//       "energy": "900",
//       "money": "100"
//   },
//   {
//   }
// ]

export const requestSessionsPerUser = obj => {
  const requestUrl = "sessionsforbill";
  return axios.post(requestUrl, qs.stringify(obj));
}




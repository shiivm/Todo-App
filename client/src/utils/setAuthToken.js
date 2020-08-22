import axios from "./axios";
const setAuthToken = token => {
  if (token) {
    // config.headers["Authorization"] = token;
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
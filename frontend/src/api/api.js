import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

console.log("baseURL", baseURL);

export const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {

  config.params = {
    ...config.params,
  };

  return config;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.log("error response", err);

    return Promise.reject(err);
  }
);

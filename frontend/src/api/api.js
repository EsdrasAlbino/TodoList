import axios from "axios";

const baseURL = process.env.BASE_API;

console.log("baseURL", baseURL);

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use((config) => {
  const apiKey = process.env.API_KEY;

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

import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const locationiqApi = axios.create({
  baseURL: "https://api.locationiq.com/v1",
  params: {
    key: import.meta.env.VITE_LOCATIONIQ_KEY,
  },
});

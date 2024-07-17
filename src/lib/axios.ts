import axios from "axios";
import { env } from "../env";

export const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
});

export const locationiqApi = axios.create({
  baseURL: "https://api.locationiq.com/v1",
  params: {
    key: env.VITE_LOCATIONIQ_KEY,
  },
});

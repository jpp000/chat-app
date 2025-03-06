import axios from "axios";
import { ENV } from "../constants/env";

export const axiosInstance = axios.create({
  baseURL: `${ENV.BASE_URL}/api`,
  withCredentials: true,
});

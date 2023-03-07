import axios from "axios";

export const apiReservation = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

apiReservation.defaults.headers.common["Content-Type"] = "application/json";

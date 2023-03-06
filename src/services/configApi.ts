import axios from "axios";

export const apiReservation = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

apiReservation.defaults.headers.common["Content-Type"] = "application/json";

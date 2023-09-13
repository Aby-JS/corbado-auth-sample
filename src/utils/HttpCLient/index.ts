import axios from "axios";

const api = "http://localhost:3001/";

export function getWithAuth<T = any>(token: string, url: string) {
  if (!token) throw new Error("No token provided");

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance.get<T>(`${api}${url}`);
}

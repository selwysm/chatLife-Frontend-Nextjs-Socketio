import io from "socket.io-client";

const url = {
  baseURL: "http://localhost:8000",
  // baseURL:,
};

export const socket = io(url.baseURL);

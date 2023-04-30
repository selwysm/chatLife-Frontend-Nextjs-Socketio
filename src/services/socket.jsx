import io from "socket.io-client";

const url = {
  // dev: "http://localhost:8000",
  prod: "https://chatlife-deploy.onrender.com",
};

export const socket = io(url.prod);

// DeliveryPage/Frontend/src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // change if backend port differs

export default socket;

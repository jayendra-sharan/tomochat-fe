import { io } from 'socket.io-client';

const socket = io("http://localhost:3001", {
  transports: ["websocket"]
});


socket.on('connect', () => {
  console.log('CW-FE: Connected to BE socket server');
});

socket.on('newMessage', (msg) => {
  console.log('CW-FE: New message', msg);
});

export default socket;

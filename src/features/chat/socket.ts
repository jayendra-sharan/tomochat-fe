import { io } from 'socket.io-client';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const socket = io(apiUrl, {
  transports: ["websocket"]
});


socket.on('connect', () => {
  console.log('CW-FE: Connected to BE socket server');
});

socket.on('newMessage', (msg) => {
  console.log('CW-FE: New message', msg);
});

export default socket;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
const server_1 = require("../server");
exports.io = new socket_io_1.Server(server_1.server);
// io.on('connection', (socket) => {
//   console.log('New webSocket Connection LIVE!!!...');
//   socket.on('setup', (userData) => {
//     socket.join(userData._id);
//     socket.emit('connected!!!');
//   });
// });
// When a message is sent, from the frontend, the message, it is emmited to the backend, which should be recieved with the chat details. if it is a private chat, the chat id should be emitted along the message. it should be used to make a post request and create a new message, then immediately emiited back to the reciever.
// for a group, the message should be made with a post request to the group, and then emiitted to every member of the group.
// const io = new Server(server);
// io.on('connection', () => {
//   console.log('New webSocket Connection...');
// });

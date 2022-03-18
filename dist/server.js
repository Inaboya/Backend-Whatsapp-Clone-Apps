"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const socket_1 = require("./socket.io/socket");
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const debug = require('debug')('whatsapp-clone-app:server');
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3050');
app_1.default.set('port', port);
exports.server = http_1.default.createServer(app_1.default);
socket_1.io.attach(exports.server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
    },
});
exports.server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

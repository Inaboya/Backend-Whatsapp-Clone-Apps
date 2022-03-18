import { io } from './socket.io/socket';
import app from './app';
import http from 'http';

const debug = require('debug')('whatsapp-clone-app:server');

const normalizePort = (val: string) => {
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

app.set('port', port);

export const server = http.createServer(app);
io.attach(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

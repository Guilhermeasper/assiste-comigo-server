import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('play', (msg) => {
    console.log('playing');
    io.emit('play');
  });

  socket.on('pause', (msg) => {
    console.log('pausing');
    io.emit('pause');
  });
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});

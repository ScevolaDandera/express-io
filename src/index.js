//import cors from 'cors';
import express from 'express';
import http from 'http';
import  { Server } from 'socket.io';
import * as path from 'path';
const __dirname = path.resolve();
//testing
const app = express();
const server = http.createServer(app);
const io = new Server(server);


import Game from '../modules/Game.js';

const Shoe = new Game(1);

console.table(JSON.stringify(Shoe));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
//  console.log("server works");
//  res.setHeader('Content-Type', 'application/json');
//  res.send(Shoe);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit('shoe', Shoe);
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
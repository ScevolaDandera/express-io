import cors from 'cors';
import express from 'express';
import http from 'http';
import  { Server } from 'socket.io';
import * as path from 'path';
const __dirname = path.resolve();
//testing
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors());
const server = http.createServer(app);

const io = new Server(server);


import Game from '../modules/Game.js';

const Shoe = new Game(6);
// console.table(JSON.stringify(Shoe));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});



io.on('connect', (socket) => {
  console.log('connected to browser', socket.id);
 

  socket.on("hello", (data) => {
    console.log("data: " + JSON.stringify(data));
    });
  
    socket.on("requestJoin", () => {
      sendShoe();
      });

});

function sendShoe() {
  io.emit('shoe', Shoe);
}



server.listen(3000, () => {
  console.log('listening on *:3000');
});
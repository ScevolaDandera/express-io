import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as path from 'path';
const __dirname = path.resolve();
//testing
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors());
const server = http.createServer(app);

const io = new Server(server);

class gameManager {
  constructor(game, group) {
    this.game = game;
    this.group = group;
  }
}


import Game from '../modules/Game.js';
let games = [];


function makeRoom(roomName) {
  let gm;
  const checkifGame = games[roomName] ? true : false;
  if (checkifGame == false) {
    let game = new Game(6);
    gm = new gameManager(game, roomName);
    games[roomName] = gm;
  } else {
    gm = games[roomName];
  }
  return gm;
}



// console.table(JSON.stringify(Shoe));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connect', (socket) => {
  console.log('connected to browser', socket.id);


  socket.on("hello", (data) => {
    console.log("data: " + JSON.stringify(data));
  });

  socket.on("JoinRoom", (room) => {
    console.log("Clicked Join room: " + room);
    socket.join(room);

    if (typeof(games[room]) === 'undefined') {
      makeRoom(room);
      console.log("does not exist");
    }
    //fix this later
    console.log("games: " + JSON.stringify(games));
      const flop = games[room].game.start();
      console.log(flop);
      sendFlop(flop, room);
      wait(2000);

      console.log("Done waiting");



  });

});

// function sendShoe(room, Shoe) {
//   console.log("Sending shoe to room: " + room);
//   io.to(room).emit('shoe', Shoe);
// }


function sendFlop(flop, room) {
  console.log("Sending flop to room: " + room);
  io.to(room).emit('flop', flop);
}

function wait(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
    console.log("waiting.. . . . ", end - start);
  }
}



server.listen(6000, () => {
  console.log('listening on *:4000');
});
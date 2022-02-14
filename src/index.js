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
    let game = new Game(6);
    let gm = new gameManager(game, roomName);
    games[roomName] = gm;
    console.log("Created new game: " + roomName);
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

    //game loop starts here

    if (typeof(games[room]) === 'undefined') {
      console.log("does not exist");
      makeRoom(room);
    }
    // console.log("games: " + JSON.stringify(games));
    const currentGame = games[room].game;
      const flop = currentGame.start();
      betOpen(room);
      sendFlop(flop, room);
      currentGame.wait(2000);
      let checkWinner = currentGame.checkForWinner();
      if(!checkWinner) {
        currentGame.takeTurn();
      }
      else {
        sendWinner(checkWinner);
        console.log("Round finished");
        currentGame.reset();
        //if no enough balance in shoe, exit loop 
        // or loop again
      }


      //testin
      //game loop ends here
      //testing
      



  });

});

function betOpen(room) {
  console.log("Bet Open!");
  io.to(room).emit('betOpen');
}


function sendFlop(flop, room) {
  console.log("Sending flop to room: " + room);
  io.to(room).emit('flop', flop);
}




server.listen(4000, () => {
  console.log('listening on *:4000');
});
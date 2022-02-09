import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";


class App {
    constructor() {
        this.container = document.getElementById("container");
        this.socket = io();
        this.init();
        this.pslot1 = document.getElementsByClassName("player1")[0];
        this.pslot2 = document.getElementsByClassName("player2")[0];
        this.pslot3 = document.getElementsByClassName("player3")[0];
        this.bslot1 = document.getElementsByClassName("banker1")[0];
        this.bslot2 = document.getElementsByClassName("banker2")[0];
        this.bslot3 = document.getElementsByClassName("banker3")[0];
    }

    
    renderCards (suit, rank, asset) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-face card-face-front"><img src="/assets/Cards/`+ asset+ `" /></div>`;
        return card;
    }

    resetFlopSlots() {
        this.pslot1.innerHTML = "";
        this.pslot2.innerHTML = "";
        this.pslot3.innerHTML = "";
        this.bslot1.innerHTML = "";
        this.bslot2.innerHTML = "";
        this.bslot3.innerHTML = "";
    }

    loadFlop(data) {
       console.log(data);
       this.resetFlopSlots();
         this.pslot1.appendChild(this.renderCards(data[0].suit, data[0].value, data[0].asset));
        this.pslot2.appendChild(this.renderCards(data[2].suit, data[2].value, data[2].asset));
        this.bslot1.appendChild(this.renderCards(data[1].suit, data[1].value, data[1].asset));
        this.bslot2.appendChild(this.renderCards(data[3].suit, data[3].value, data[3].asset));
    }

    init() {
        const startbtn = document.getElementById("startbtn");
        startbtn.addEventListener("click", () => {
          //  this.socket.join("TestRoom");
            this.socket.emit("JoinRoom", "TestRoom");
        });


        this.socket.on("connect", () => {
            console.log("connected to server", this.socket.id);
        });

   //     this.socket.on("shoe", this.LoadShoe.bind(this));
   this.socket.on("flop", this.loadFlop.bind(this));
        
    }

}




const app = new App();




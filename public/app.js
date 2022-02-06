import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";


class App {
    constructor() {
        this.socket = io();
        this.Shoe = null;
        this.init();
        
    }

    
    renderCards (suit, rank) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-face card-face-front">` + suit + `</div>
            <div class="card-face card-face-back">` + rank + `</div>
        `;
        return card;
    }

    LoadShoe(data) {
            //  console.table("data: " + JSON.stringify(data.deck[0]));
            const dataArray = Object.entries(data);
            const PreShoe = dataArray[0][1];
            this.Shoe = PreShoe[0]
           console.log(this.Shoe);

            this.Shoe.forEach(element => {
                const card = this.renderCards(element.suit, element.value);
                this.container.appendChild(card);
            });
    }

    init() {
        const container = document.getElementById("container");
        const card = this.renderCards();
        this.container = container;

        this.socket.on("connect", () => {
            console.log("connected to server", this.socket.id);
            this.socket.emit("hello", "world");

        });

        this.socket.emit("requestJoin");
        this.socket.on("shoe", this.LoadShoe.bind(this));

        
    }

}




const app = new App();




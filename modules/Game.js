import  { Deck } from './Deck.js';




export default class Game {

    constructor(numberOfDecks) {
        this.deck = new Deck(numberOfDecks);
        this.started = false;
        this.round = 0;
        this.playerPicks = 0;
        this.bankerPicks = 0;
        this.playerScore = 0;
        this.bankerScore = 0;
        this.playerCards = [];
        this.bankerCards = [];
        this.winner = false;

       this.start();

    }

    start() {
        this.started = true;
        this.evaLuate();
    }

    setWinner(winner) {
        this.winner = winner;
    }

    evaLuate() {

        if(this.playerPicks <2 || this.bankerPicks <2) {
       
            this.pickForPlayer();
            this.pickForBanker();
            console.log("cards picked: " + this.playerPicks + " " + this.bankerPicks);
            this.evaLuate();
        }

        if(this.playerPicks > 2 || this.bankerPicks > 2) {
            console.log("Picks: ", this.playerPicks, this.bankerPicks);

            if(this.playerScore == this.bankerScore) {
                console.log("Tie", this.playerScore, this.bankerScore);
             
            }
            if(this.playerScore > this.bankerScore) {
                console.log("Player Wins", this.playerScore, this.bankerScore);
            }
            if(this.bankerScore > this.playerScore) {
                console.log("Banker Wins", this.playerScore, this.bankerScore);
            }
            this.winner = true;
        }


        if(this.winner == false) {
        if(this.playerPicks == 2 && this.bankerPicks == 2) {
            if(this.playerScore == 9) {
                console.log(this.playerCards);
                console.log("Player won!", this.playerScore);
                this.setWinner("Player");
                console.log("Win by 2 cards!");
                return;
            }
            if(this.bankerScore == 9) {
                console.log(this.bankerCards);
                console.log("Banker won!", this.bankerScore);
                this.setWinner("Banker");
                console.log("Win by 2 cards!");
                return;
            }
            if(this.playerScore <= 5) {
                console.log("Player picks again because player score is: ", this.playerScore);
               this.pickForPlayer();
            }
            if(this.bankerScore <= 5) {
                console.log("Banker picks again because banker score is: ", this.bankerScore);
                this.pickForBanker();
            }
           this.evaLuate();
        }


       
    }
    }

    getScore(card) {
        let value = 0;
        if(card.value === 'A') {
            value = 1;
        } 
        else if(card.value === 10 | card.value === 'J' | card.value === 'Q' | card.value === 'K') {
            value = 0;
        }
         else {
            value = parseInt(card.value);
        }
        return value;
    }

    remainingCards() {
        return this.deck.length;
    }

    pickCard() {
        const card = this.deck.splice(0,1);
       return card[0];
    }

    addScore(previousScore, newPoints){
        let sum = previousScore + newPoints;
        if(sum == 10) {
            sum = 0;
        }
        if( sum > 10) {
            sum -= 10;
        }
        return sum;
    }

    pickForPlayer() {
        const card = this.pickCard();
        this.playerCards.push(card);
        this.playerScore = this.addScore(this.playerScore,this.getScore(card));
        this.playerPicks++;
        return card;
    }

    pickForBanker() {
        const card = this.pickCard();
        this.bankerCards.push(card);
        this.bankerScore = this.addScore(this.bankerScore,this.getScore(card));
        this.bankerPicks++;
        return card;
    }






 
}


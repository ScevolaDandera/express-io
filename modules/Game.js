import { Deck } from './Deck.js';

export default class Game {

    constructor(numberOfDecks) {
        this.deck = new Deck(numberOfDecks);
        this.round = 0;
        this.playerPicks = 0;
        this.bankerPicks = 0;
        this.playerScore = 0;
        this.bankerScore = 0;
        this.playerCards = [];
        this.bankerCards = [];
        this.winner = false;
        this.bettingOpen = true;
        this.started = false;
        this.flopResults = [];

    }


  
    start() {
    if(this.started == false) {
        this.started = true;
        this.round++;
        this.flopResults = this.pickFlop();
    } else {
        console.log("Game has already started!");
    }
        return this.flopResults;
    }

    reset() {
        this.start = false;
        this.betOpen();
        this.winner = false;
        this.flopResults = [];
    }

    shouldTakeTurn() {
        const flopWinner = this.checkForWinner();
        return (flopWinner == false) ? true : false;
    }

    betOpen() {
        this.bettingOpen = true;
        return this.bettingOpen;
    }

    betClose() {
        this.bettingOpen = false;
        return this.bettingOpen;
    }

    takeTurn() {
        //take another card
        console.log("taking turn");
    }

    pickFlop() {
            return [this.pickForPlayer(), this.pickForBanker(), this.pickForPlayer(),this.pickForBanker()];
        }

    checkForWinner() {
        let playerWon = (this.playerScore == 9) ? "Player" : false;
        let bankerWon = (this.bankerScore == 9) ? "Banker" : false;
        let tie = (this.playerScore == this.bankerScore) ? "Tie" : false;
            if(tie) {
                this.setWinner(tie);
            }
            if(playerWon) {
                this.setWinner(playerWon);
            }
            if(bankerWon) {
                this.setWinner(bankerWon);
            }
            return this.winner;
    }


    setWinner(winner) {
        this.winner = winner;
    }

    evaLuate() {

        if (this.playerPicks < 2 || this.bankerPicks < 2) {

            this.pickForPlayer();
            this.pickForBanker();
            console.log("cards picked: " + this.playerPicks + " " + this.bankerPicks);
            this.evaLuate();
        }

        if (this.playerPicks > 2 || this.bankerPicks > 2) {
            console.log("Picks: ", this.playerPicks, this.bankerPicks);

            if (this.playerScore == this.bankerScore) {
                console.log("Tie", this.playerScore, this.bankerScore);

            }
            if (this.playerScore > this.bankerScore) {
                console.log("Player Wins", this.playerScore, this.bankerScore);
            }
            if (this.bankerScore > this.playerScore) {
                console.log("Banker Wins", this.playerScore, this.bankerScore);
            }
            this.winner = true;
        }


        if (this.winner == false) {
            if (this.playerPicks == 2 && this.bankerPicks == 2) {
                if (this.playerScore == 9) {
                    console.log(this.playerCards);
                    console.log("Player won!", this.playerScore);
                    this.setWinner("Player");
                    console.log("Win by 2 cards!");
                    return;
                }
                if (this.bankerScore == 9) {
                    console.log(this.bankerCards);
                    console.log("Banker won!", this.bankerScore);
                    this.setWinner("Banker");
                    console.log("Win by 2 cards!");
                    return;
                }
                if (this.playerScore <= 5) {
                    console.log("Player picks again because player score is: ", this.playerScore);
                    this.pickForPlayer();
                }
                if (this.bankerScore <= 5) {
                    console.log("Banker picks again because banker score is: ", this.bankerScore);
                    this.pickForBanker();
                }
                this.evaLuate();
            }



        }
    }
    wait(ms) {
        this.betOpen();
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
          end = new Date().getTime();
          console.log("waiting.. . . . ", end - start);
        }
        this.betClose();
        console.log("Done waiting.. betClosed");
      }
      
    getScore(card) {
        let value = 0;
        if (card.value === 'A') {
            value = 1;
        }
        else if (card.value === 10 | card.value === 'J' | card.value === 'Q' | card.value === 'K') {
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
        const card = this.deck.splice(0, 1);
        return card[0];
    }

    addScore(previousScore, newPoints) {
        let sum = previousScore + newPoints;
        if (sum == 10) {
            sum = 0;
        }
        if (sum > 10) {
            sum -= 10;
        }
        return sum;
    }

    pickForPlayer() {
        const card = this.pickCard();
        this.playerCards.push(card);
        this.playerScore = this.addScore(this.playerScore, this.getScore(card));
        this.playerPicks++;
        return card;
    }

    pickForBanker() {
        const card = this.pickCard();
        this.bankerCards.push(card);
        this.bankerScore = this.addScore(this.bankerScore, this.getScore(card));
        this.bankerPicks++;
        return card;
    }

}


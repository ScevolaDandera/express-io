import  { Deck } from './Deck.js';



export default class Game {
    constructor(numberOfDecks) {
        this.deck = new Deck(numberOfDecks);
    }

    pickCard() {
        const card = this.deck.splice(0,1);
        return card;

    }
}


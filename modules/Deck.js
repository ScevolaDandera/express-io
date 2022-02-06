export class Deck {
    constructor(numberOfDecks) {
        this.cards = [];
        this.suits = ['hearts', 'diamonds', 'spades', 'clubs'];
        this.values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        for (let i = 0; i < numberOfDecks; i++) {
            let curDeck = [];
            for (let suit in this.suits) {
                for (let value in this.values) {
                    curDeck.push({
                        suit: this.suits[suit],
                        value: this.values[value]
                    });
                }
            }
            this.cards.push(curDeck);
        }
     //   return this.shuffle(this.cards);
     return this.cards;
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}





class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.faceDown = false;
  }
}

// Ace is the highest, 2 is the lowest
export default Card;

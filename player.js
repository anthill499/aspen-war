class Player {
  constructor(deck = []) {
    this.pile = deck;
    this.wonGame = false;
    this.currentCards = [];
  }

  continueWar = () => {
    this.currentCards.push(this.pile.shift(), this.pile.shift());
  };

  deckSize = () => {
    return this.pile.length;
  };

  removeTopCard = () => {
    return this.pile.shift();
  };
}

export default Player;

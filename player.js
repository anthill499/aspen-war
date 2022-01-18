class Player {
  constructor(deck = []) {
    this.pile = deck;
    this.wonGame = false;
    this.currentCards = [];
  }

  continueWar = () => {
    for (let i = 1; i <= 4; i++) {
      const picked = this.pile.shift();
      if (picked !== undefined) {
        this.currentCards.push(picked);
      } else {
        return false;
      }
    }
    return true;
  };

  deckSize = () => {
    return this.pile.length;
  };

  removeTopCard = () => {
    return this.pile.shift();
  };

  // Takes both piles after wining war
  winCurrentWar = (myCards, oppenentsCards) => {
    this.pile.push(...myCards, ...oppenentsCards);
  };

  lengthOfCurrCards = () => {
    return this.currentCards.length;
  };

  topCurrentCard = () => {
    return this.currentCards[this.currentCards.length - 1];
  };
}

export default Player;

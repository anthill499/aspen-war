// import Card from "./card";
import Card from "./card.js";
import Player from "./player.js";
import Rules from "./rules.js";

class Game {
  constructor() {
    this.playerOne = new Player();
    this.playerTwo = new Player();
    this.generateDeck();
    this.startGame();
  }

  generateDeck = () => {
    const used = {};
    const playerOneCards = [];
    const playerTwoCards = [];
    while (playerOneCards.length < 26) {
      const randomSuit =
        Rules.suits[Math.floor(Math.random() * Rules.suits.length)];
      const randomRank =
        Rules.ranks[Math.floor(Math.random() * Rules.ranks.length)];
      if (!used[`${randomRank} of ${randomSuit}`]) {
        playerOneCards.push(new Card(randomSuit, randomRank));
        used[`${randomRank} of ${randomSuit}`] = true;
      }
    }
    while (playerTwoCards.length < 26) {
      const randomSuit =
        Rules.suits[Math.floor(Math.random() * Rules.suits.length)];
      const randomRank =
        Rules.ranks[Math.floor(Math.random() * Rules.ranks.length)];
      if (!used[`${randomRank} of ${randomSuit}`]) {
        playerTwoCards.push(new Card(randomSuit, randomRank));
        used[`${randomRank} of ${randomSuit}`] = true;
      }
    }
    this.playerOne.pile = playerOneCards;
    this.playerTwo.pile = playerTwoCards;
  };

  startGame = () => {
    while (this.playerOne.deckSize() > 0 && this.playerTwo.deckSize() > 0) {
      console.log(this.playerOne.deckSize(), this.playerTwo.deckSize());
      this.playerOne.currentCards.push(this.playerOne.removeTopCard()); // Push these cards into player's current pile
      this.playerTwo.currentCards.push(this.playerTwo.removeTopCard());
      // As long as the compared cards are the same, we will keep adding and checking.
      console.log(
        this.playerOne.topCurrentCard(),
        this.playerTwo.topCurrentCard()
      );
      let resultOfComparison = Rules.compareCards(
        this.playerOne.topCurrentCard(),
        this.playerTwo.topCurrentCard()
      );

      // If card's rank are the same, start war
      while (
        resultOfComparison === 0 &&
        this.playerOne.deckSize() > 0 &&
        this.playerTwo.deckSize() > 0
      ) {
        this.playerOne.continueWar();
        this.playerTwo.continueWar();
        resultOfComparison = Rules.compareCards(
          this.playerOne.topCurrentCard(),
          this.playerTwo.topCurrentCard()
        );
      }
      if (this.playerOne.deckSize() === 0 || this.playerTwo.deckSize() === 0)
        break;

      console.log(resultOfComparison);
      // Place loser's cards into winner's deck
      if (resultOfComparison === 1) {
        this.playerOne.winCurrentWar(
          this.playerOne.currentCards,
          this.playerTwo.currentCards
        );
      } else if (resultOfComparison === -1) {
        this.playerTwo.winCurrentWar(
          this.playerOne.currentCards,
          this.playerTwo.currentCards
        );
      }

      // Reset both player's current cards in the pot
      this.playerOne.currentCards = [];
      this.playerTwo.currentCards = [];

      // Determines if there is a winner at end of each card draw. Winning condition
    }

    if (this.playerOne.deckSize() === 0) {
      this.playerTwo.wonGame = true;
    } else if (this.playerTwo.deckSize() === 0) {
      this.playerOne.wonGame = true;
    }
  };

  showWinner = () => {
    return this.playerOne.wonGame ? this.playerOne : this.playerTwo;
  };
}

export default Game;

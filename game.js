// import Card from "./card";
import Card from "./card.js";
import Player from "./player.js";
import Rules from "./rules.js";
import readline from "./readline.js";

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
    while (!this.playerOne.wonGame && !this.playerTwo.wonGame) {
      const PlayerOneFaceUp = this.playerOne.removeTopCard(); // Both players face one card up
      const PlayerTwoFaceUp = this.playerTwo.removeTopCard();
      this.playerOne.currentCards.push(PlayerOneFaceUp); // Push these cards into player's current pile
      this.playerTwo.currentCards.push(PlayerTwoFaceUp);
      // As long as the compared cards are the same, we will keep adding and checking.

      let resultOfComparison = Rules.compareCards(
        this.playerOne.currentCards[this.playerOne.currentCards.length - 1],
        this.playerTwo.currentCards[this.playerTwo.currentCards.length - 1]
      );

      while (resultOfComparison === 0) {
        if (this.playerOne.pile.length >= 2) {
          this.playerOne.continueWar();
        } else {
          break;
        }
        if (this.playerOne.pile.length >= 2) {
          this.playerOne.continueWar();
        } else {
          break;
        }
        resultOfComparison = Rules.compareCards(
          this.playerOne.currentCards[this.playerOne.currentCards.length - 1],
          this.playerTwo.currentCards[this.playerTwo.currentCards.length - 1]
        );
      }

      // Place loser's cards into winner's deck
      if (resultOfComparison === 1) {
        this.playerOne.pile.push(...this.playerTwo.currentCards);
      } else if (resultOfComparison === -1) {
        this.playerTwo.pile.push(...this.playerOne.currentCards);
      }

      // Reset both player's current cards in the pot
      this.playerOne.currentCards = [];
      this.playerTwo.currentCards = [];

      // Determines if there is a winner at end of each card draw. Winning condition
      if (this.playerOne.deckSize() === 52) {
        this.playerOne.wonGame = true;
      } else if (this.playerTwo.deckSize() === 52) {
        this.playerTwo.wonGame = true;
      }
    }
  };

  showWinner = () => {
    return this.playerOne.wonGame ? this.playerOne : this.playerTwo;
  };
}

export default Game;

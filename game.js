// import Card from "./card";
import Card from "./card.js";
import Player from "./player.js";
import Rules from "./rules.js";

class Game {
  constructor() {
    this.winner = null;
    this.playerOne = new Player();
    this.playerTwo = new Player();
    this.generateDeck();
    this.startGame();
  }

  generateDeck = () => {
    // pretty inefficient
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
    while (!this.winner) {
      this.playerOne.currentCards.push(this.playerOne.removeTopCard()); // Push these cards into player's current pile
      this.playerTwo.currentCards.push(this.playerTwo.removeTopCard());
      // As long as the compared cards are the same, we will keep adding and checking.

      let resultOfComparison = Rules.compareCards(
        this.playerOne.topCurrentCard(),
        this.playerTwo.topCurrentCard()
      );

      // If card's rank are the same, start war, PROBLEM IS HERE
      while (resultOfComparison === 0) {
        // continue the war
        if (!this.playerOne.continueWar()) {
          this.playerTwo.winCurrentWar();
          this.winner = this.playerTwo;
          break;
        }
        if (!this.playerTwo.continueWar()) {
          this.playerOne.winCurrentWar();
          this.winner = this.playerOne;
          break;
        }
        resultOfComparison = Rules.compareCards(
          this.playerOne.topCurrentCard(),
          this.playerTwo.topCurrentCard()
        );
      }

      if (this.winner) break;

      if (resultOfComparison === 1) {
        // Place loser's cards into winner's deck
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
    }
  };

  showWinner = () => {
    return this.playerOne.wonGame ? this.playerOne : this.playerTwo;
  };
}

export default Game;

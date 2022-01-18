// import Card from "./card";
import Card from "./card.js";
import Player from "./player.js";
import Rules from "./rules.js";

class Game {
  constructor(playerOne) {
    this.winner = null;
    this.playerOne = playerOne;
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
    console.log(this.playerOne.pile, this.playerTwo.pile);
  };

  startGame = () => {
    while (!this.winner) {
      if (this.playerOne.deckSize() <= 0 || this.playerTwo.deckSize() <= 0) {
        this.winner =
          this.playerTwo.deckSize() <= 0 ? this.playerOne : this.playerTwo;
        break;
      }
      this.playerOne.currentCards.push(this.playerOne.removeTopCard()); // Push these cards into player's current pile
      this.playerTwo.currentCards.push(this.playerTwo.removeTopCard());
      // As long as the compared cards are the same, we will keep adding and checking.

      let resultOfComparison = Rules.compareCards(
        this.playerOne.topCurrentCard(),
        this.playerTwo.topCurrentCard()
      );

      // If card's rank are the same, start war, PROBLEM IS HERE
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
      } else {
        while (resultOfComparison === 0) {
          const boolOne = this.playerOne.continueWar();
          const boolTwo = this.playerTwo.continueWar();
          console.log(
            `Result of comparison is ${resultOfComparison}`,
            this.playerOne.deckSize(),
            this.playerTwo.deckSize()
          );
          if (!boolOne) {
            this.winner = this.playerTwo;
            this.playerTwo.winCurrentWar(
              this.playerOne.currentCards,
              this.playerTwo.currentCards
            );
            break;
          }
          if (!boolTwo) {
            this.winner = this.playerOne;
            this.playerOne.winCurrentWar(
              this.playerOne.currentCards,
              this.playerTwo.currentCards
            );
            break;
          }
          resultOfComparison = Rules.compareCards(
            this.playerOne.topCurrentCard(),
            this.playerTwo.topCurrentCard()
          );
        }
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
      }

      console.log(
        resultOfComparison,
        this.playerOne.deckSize(),
        this.playerTwo.deckSize()
      );

      // Reset both player's current cards in the pot
      this.playerOne.emptyCurrentCards();
      this.playerTwo.emptyCurrentCards();
    }
    this.showWinner();
  };

  showWinner = () => {
    console.log(`The winner is ${this.winner.name}`);
    return this.winner;
  };
}

export default Game;

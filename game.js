// import Card from "./card";
import Card from "./card.js";
import Player from "./player.js";
import Rules from "./rules.js";
class Game extends Rules {
  constructor() {
    super();
    this.playerOne = new Player([]);
    this.playerTwo = new Player([]);
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
        // playerOneCards.push(`${randomRank} of ${randomSuit}`);
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
        // playerTwoCards.push(`${randomRank} of ${randomSuit}`);
        used[`${randomRank} of ${randomSuit}`] = true;
      }
    }
    this.playerOne.pile = playerOneCards;
    this.playerTwo.pile = playerTwoCards;
  };
}

const newGame = new Game();
newGame.generateDeck();
console.log(newGame);
export default Game;

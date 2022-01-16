class Rules {
  constructor() {}
  static suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  static ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];

  static compareCards = (pOneCard, pTwoCard) => {
    console.log(pOneCard, pTwoCard);
    console.log("-----------");
    const playerOneCardIndex = Rules.ranks.indexOf(pOneCard.rank);
    const playerTwoCardIndex = Rules.ranks.indexOf(pTwoCard.rank);
    if (playerOneCardIndex > playerTwoCardIndex) {
      return 1;
    } else if (playerOneCardIndex < playerTwoCardIndex) {
      return -1;
    } else {
      return 0;
    }
  };
}

export default Rules;

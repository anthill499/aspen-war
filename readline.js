import Game from "./game.js";
import * as rl from "readline";

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`Hey, Whats your name? `, (name) => {
  readline.question(
    `What's up ${name}!, Down for some War? [Y/n] `,
    (input) => {
      if (input.trim().toLowerCase() === "y") {
        console.log("Lets Go!");
        const newGame = new Game();
        newGame.showWinner();
        readline.close();
      } else {
        console.log("Maybe next time then!");
        readline.close();
      }
    }
  );
});

export default readline;

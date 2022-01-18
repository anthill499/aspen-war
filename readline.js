import Game from "./game.js";
import * as rl from "readline";
import Player from "./player.js";

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
        const newGame = new Game(new Player(name));
        readline.close();
      } else {
        console.log("Maybe next time then!");
        readline.close();
      }
    }
  );
});

export default readline;

import "../sass/main.scss";
import Coin from "./coin";
import Game from "./game";

const game = new Game();
game.startGame();

document.addEventListener("keydown", function (event) {
  game.turnFurry(event);
});

document.querySelector(".btn-info").addEventListener("click", function () {
  document.getElementById("over").classList.add("hide");
  game.gameOver() == false;
  game.hideVisibleCoin();
  game.coin = new Coin();
  game.score = 0;
  document.getElementById("score").innerText = game.score;
  game.startGame();
});

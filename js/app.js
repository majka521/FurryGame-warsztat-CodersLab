import "../sass/main.scss";
import Game from "./game";

const game = new Game();
game.startGame();
game.initEvent();

// window.localStorage.setItem("bestScore", game.bestScore);
// game.bestScore = window.localStorage.getItem("bestScore");

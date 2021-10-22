import Furry from "./furry";
import Coin from "./coin";

class Game {
  constructor() {
    this.board = document.getElementById("board").children;
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.bestScore = 0;
  }
  index(x, y) {
    return x + y * 10;
  }
  showFurry() {
    this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
  }
  hideVisibleFurry() {
    document.querySelector(".furry").classList.remove("furry");
  }
  showCoin() {
    this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
  }
  hideVisibleCoin() {
    document.querySelector(".coin").classList.remove("coin");
  }
  moveFurry(self, interval) {
    if (self.furry.direction === "right") {
      self.furry.x = self.furry.x + 1;
    } else if (self.furry.direction === "left") {
      self.furry.x = self.furry.x - 1;
    } else if (self.furry.direction === "up") {
      self.furry.y = self.furry.y - 1;
    } else if (self.furry.direction === "down") {
      self.furry.y = self.furry.y + 1;
    }
    self.checkCoinCollision();
    if (self.gameOver(interval) == false) {
      self.hideVisibleFurry();
      self.showFurry();
    } else {
      this.furry = new Furry();
      return;
    }
  }
  turnFurry(event) {
    switch (event.which) {
      case 37:
        this.furry.direction = "left";
        break;
      case 39:
        this.furry.direction = "right";
        break;
      case 38:
        this.furry.direction = "up";
        break;
      case 40:
        this.furry.direction = "down";
        break;
    }
  }
  checkCoinCollision() {
    if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
      document.querySelector(".coin").classList.remove("coin");
      this.score += 1;
      document.getElementById("score").innerText = this.score;
      this.coin = new Coin();
      this.showCoin();
    }
  }
  gameOver(interval) {
    if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
      clearInterval(interval);
      document.getElementById("over").classList.remove("hide");
      document.getElementById("final-score").innerText = this.score;
      this.hideVisibleFurry();
      if (this.bestScore < this.score) {
        this.bestScore = this.score;
      }
      if (localStorage.getItem("bestScore") == null) {
        window.localStorage.setItem("bestScore", this.bestScore);
      } else if (localStorage.getItem("bestScore") < this.bestScore) {
        window.localStorage.setItem("bestScore", this.bestScore);
      }
      document.getElementById("best-score").innerText = localStorage.getItem("bestScore");
      return true;
    }
    return false;
  }
  startGame() {
    this.showFurry();
    this.showCoin();
    let self = this;
    const interval = setInterval(function () {
      self.moveFurry(self, interval);
    }, 250);
  }

  initEvent() {
    let self = this;
    document.addEventListener("keydown", function (event) {
      self.turnFurry(event);
    });

    document.querySelector(".btn-info").addEventListener("click", function () {
      document.getElementById("over").classList.add("hide");
      self.hideVisibleCoin();
      self.coin = new Coin();
      self.score = 0;
      document.getElementById("score").innerText = self.score;
      self.startGame();
    });
  }
}

export default Game;

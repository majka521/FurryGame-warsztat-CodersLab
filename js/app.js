import "../sass/main.scss";

class Furry {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
  }
}

class Coin {
  constructor() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
  }
}

class Game {
  constructor() {
    this.board = document.getElementById("board").children;
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
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
    self.gameOver(interval);
    self.hideVisibleFurry();
    self.showFurry();
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
    }
    return;
  }
  startGame() {
    this.showFurry();
    this.showCoin();
    let self = this;
    const interval = setInterval(function () {
      self.moveFurry(self, interval);
    }, 250);
  }
}

const game = new Game();
game.startGame();

document.addEventListener("keydown", function (event) {
  game.turnFurry(event);
});

// document.querySelector("btn-info").addEventListener("click", function (event) {
//   event.preventDefault
// });

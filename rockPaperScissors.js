let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalid;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalid = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalid);
    isAutoPlaying = false;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document.querySelector(".js-reset-button").addEventListener("click", () => {
  resetScore();
});

document.querySelector(".js-auto-play-button").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose :(";
    } else if (computerMove === "paper") {
      result = "You win :D";
    } else {
      result = "Tie :O";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win :D";
    } else if (computerMove === "paper") {
      result = "Tie :O";
    } else {
      result = "You lose :(";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie :O";
    } else if (computerMove === "paper") {
      result = "You lose :(";
    } else {
      result = "You win :D";
    }
  }

  if (result === "You win :D") {
    score.wins += 1;
  } else if (result === "You lose :(") {
    score.losses += 1;
  } else if (result === "Tie :0") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = ` You <img src="images/${playerMove}-emoji.png" class="move-icon" />
<img src="images/${computerMove}-emoji.png" class="move-icon" /> Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }

  return computerMove;
}

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };

  localStorage.removeItem("score");
  updateScoreElement();
}

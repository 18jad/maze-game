// load the code when all elements on page are ready
window.addEventListener("load", function () {
  const start = document.getElementById("start"),
    boundaries = document.querySelectorAll(".boundary"),
    end = document.getElementById("end"),
    statusText = document.getElementById("status"),
    game = document.getElementById("game");

  // game status to check if game is running or no
  let gameStatus = "idle";

  // add boundary border to detect collision between cursor and border not after cursor get inside the boundary
  let borderWidth = 1;

  // used for highliting the boundary that the cursor hit
  let changed = 0;

  // for score system
  let score = 0,
    highestScore = 0;

  // to avoid selecting S and E characters inside the start and end box
  start.style.userSelect = "none";
  end.style.userSelect = "none";

  function startGame() {
    // if game is already started do nothing
    if (gameStatus === "started") return;
    statusText.innerText = "Game started";
    gameStatus = "started";
    dontCheat();
    resetStart();
  }

  // detect collision between cursor and boundaries
  boundaries.forEach(function (boundary) {
    boundary.style.transition = "background 150ms ease-in-out";
    boundary.addEventListener("mouseenter", function (e) {
      endGame();
      if (gameStatus === "ended" && gameStatus != "started" && changed == 0) {
        // highlight the collided boundary
        boundary.style.background = "red";
        changed++;
      }
    });
  });

  end.addEventListener("mouseenter", () => winGame());

  // for user to not reach the end from outside the maze
  function dontCheat() {
    game.addEventListener("mousemove", function (e) {
      if (gameStatus === "started") {
        let left = e.offsetX;
        if (
          left <= 1 ||
          (left <= boundaries[3].clientWidth - borderWidth &&
            left >= boundaries[3].clientWidth - 5)
        )
          endGame();
      }
    });
  }

  function endGame() {
    // if game is already finished do nothing
    if (gameStatus == "ended") return;
    else if (gameStatus == "started") {
      statusText.textContent = "You lost!";
      gameStatus = "ended";
      changed = 0;
      boundaries.forEach(function (boundary) {
        boundary.style.background = "rgba(255, 0, 0, 0.4)";
        boundary.style.borderColor = "rgb(99, 1, 1)";
      });
      start.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
      statusText.style.color = "red";

      // score won't be negative and go under 0
      score = Math.max(0, score - 10);

      updateScore();
    }
  }

  function winGame() {
    if (gameStatus == "winning" || gameStatus != "started") return;
    statusText.textContent = "You won!";
    gameStatus = "winning";
    boundaries.forEach(function (boundary) {
      boundary.style.backgroundColor = "rgba(0, 255, 0, 0.4)";
      boundary.style.borderColor = "green";
    });
    start.style.backgroundColor = "rgba(0, 255, 0, 0.6)";
    end.style.backgroundColor = "rgba(0, 255, 0, 0.6)";
    statusText.style.color = "lime";
    score += 5;
    updateScore();
  }

  // reset start box to it's default position and reset styles
  function resetStart() {
    start.style.backgroundColor = "#88ff88";
    end.style.backgroundColor = "#8888ff";
    boundaries.forEach(function (boundary) {
      boundary.style.backgroundColor = "#eeeeee";
      boundary.style.borderColor = "black";
    });
    statusText.style.color = "black";
  }

  // Scoring system
  var scoreElement = document.createElement("div");
  document.body.appendChild(scoreElement);

  function updateScore() {
    // get the max score between current score and last max
    highestScore = Math.max(highestScore, score);
    scoreElement.innerHTML = `<center><h2 style="background-color: rgba(255, 255, 0, 0.7 ); width: fit-content; padding: 20px; border-radius: 10px; border: 1px solid black;">Score: ${score} <br />Highest Score: ${highestScore}</h2></center>`;
  }

  updateScore();
  start.onmouseenter = startGame;
});

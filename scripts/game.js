// load the code when all elements on page are ready
window.addEventListener("load", function () {
  const start = document.getElementById("start"),
    boundaries = document.querySelectorAll(".boundary"),
    end = document.getElementById("end"),
    statusText = document.getElementById("status"),
    game = document.getElementById("game"),
    initialTop = start.offsetTop,
    initialLeft = start.offsetLeft;

  // game status to check if game is running or no
  let gameStatus = "ended";

  // add start box border and boundary border to detect collision between them not after start box border get inside the boundary
  let borderWidth = 2;

  let score = 0;

  // to avoid selecting S and E characters inside the start and end box
  start.style.userSelect = "none";
  end.style.userSelect = "none";

  function startGame() {
    // if game is already started do nothing
    if (gameStatus === "started") return;
    statusText.innerText = "Game started";
    gameStatus = "started";
    resetStart();
    game.addEventListener("mousemove", function (e) {
      // check if game is running and mouse cursor is inside the start box
      if (
        gameStatus === "started" &&
        e.offsetX >= start.style.left.split("px")[0] &&
        e.offsetX <= parseFloat(start.style.left.split("px")[0]) + 40 &&
        e.offsetY >= start.style.top.split("px")[0] &&
        e.offsetY <= start.style.top.split("px")[0] + 40
      ) {
        let left = e.offsetX - 20;
        let top = e.offsetY - 20;
        start.style.left = left + "px";
        start.style.top = top + "px";

        // check collision between start box and boundaries
        if (
          left <=
          boundaries[3].clientWidth / 2 -
            boundaries[4].clientWidth +
            borderWidth / 2
        ) {
          if (top <= boundaries[0].clientHeight + borderWidth) endGame();
        }
        if (
          top - boundaries[0].clientHeight + start.clientHeight >=
          boundaries[3].clientHeight
        )
          endGame();
        if (
          top >= boundaries[0].clientHeight / 2 &&
          left >=
            boundaries[0].clientWidth / 2.5 +
              boundaries[1].clientWidth / 2 -
              borderWidth / 2 &&
          left <=
            boundaries[3].clientWidth / 2 +
              boundaries[4].clientWidth / 2 +
              borderWidth
        )
          endGame();
        if (top <= boundaries[1].clientHeight + borderWidth) endGame();
        if (
          left >=
            boundaries[0].clientWidth / 2.5 +
              boundaries[1].clientWidth / 2 -
              borderWidth / 2 &&
          left <=
            boundaries[3].clientWidth / 2 +
              boundaries[4].clientWidth / 2 +
              borderWidth &&
          top >= boundaries[0].clientHeight / 4 + start.clientHeight / 5
        )
          endGame();
        if (
          left >=
            boundaries[0].clientWidth +
              boundaries[1].clientWidth -
              start.clientWidth -
              borderWidth &&
          top <= boundaries[2].clientHeight + borderWidth
        )
          endGame();

        // check if start reached the end and win the game
        if (end.offsetLeft <= start.offsetLeft + start.offsetHeight) winGame();
      }
    });
    changePointerEvent("none");
  }

  function endGame() {
    if (gameStatus === "ended") return;
    statusText.textContent = "You lost!";
    gameStatus = "ended";
    boundaries.forEach(function (boundary) {
      boundary.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
      boundary.style.borderColor = "rgb(99, 1, 1)";
    });
    start.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
    statusText.style.color = "red";

    changePointerEvent("unset");
  }

  function winGame() {
    if (gameStatus === "winning") return;
    statusText.textContent = "You won!";
    gameStatus = "winning";
    boundaries.forEach(function (boundary) {
      boundary.style.backgroundColor = "rgba(0, 255, 0, 0.4)";
      boundary.style.borderColor = "green";
    });
    start.style.backgroundColor = "rgba(0, 255, 0, 0.6)";
    end.style.backgroundColor = "rgba(0, 255, 0, 0.6)";
    statusText.style.color = "lime";

    changePointerEvent("unset");
  }

  // remove mouse event and interaction with div to avoid glitches and bugs
  function changePointerEvent(_status) {
    start.style.pointerEvents = _status;
    end.style.pointerEvents = _status;
  }

  // reset start box to it's default position and reset styles
  function resetStart() {
    start.style.top = initialTop + "px";
    start.style.left = initialLeft + "px";
    start.style.backgroundColor = "#88ff88";
    end.style.backgroundColor = "#8888ff";
    boundaries.forEach(function (boundary) {
      boundary.style.backgroundColor = "#eeeeee";
      boundary.style.borderColor = "black";
    });
    statusText.style.color = "black";
  }

  start.addEventListener("click", function () {
    // if start box is not at initial position return it to there in first click then start game with second click otherwise start game from first click
    if (start.offsetTop == initialTop && start.offsetLeft == initialLeft) {
      startGame();
    } else {
      statusText.textContent = 'Begin by moving your mouse over the "S".';
      resetStart();
    }
  });
});

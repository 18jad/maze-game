const start = document.getElementById("start"),
  boundaries = document.querySelectorAll(".boundary"),
  end = document.getElementById("end"),
  statusText = document.getElementById("status"),
  game = document.getElementById("game");

// game status to check if game is running or no
let gameStatus = "ended";

// add start box border and boundary border to detect collision between them not after start box border get inside the boundary
let borderWidth = 2;

function startGame() {
  if (gameStatus === "started") return;
  statusText.innerText = "Game started";
  gameStatus = "started";
  game.addEventListener("mousemove", function (e) {
    if (gameStatus === "started") {
      let left = e.offsetX - 20;
      let top = e.offsetY - 20;
      start.style.left = left + "px";
      start.style.top = top + "px";
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
    }
  });
  changePointerEvent("none");
}

function endGame() {
  if (gameStatus === "ended") return;
  statusText.innerText = "Game ended";
  gameStatus = "ended";
  changePointerEvent("unset");
}

function changePointerEvent(_status) {
  start.style.pointerEvents = _status;
  end.style.pointerEvents = _status;
}

start.addEventListener("click", startGame);

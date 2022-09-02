const start = document.getElementById("start"),
  boundaries = document.querySelectorAll(".boundary"),
  end = document.getElementById("end"),
  statusText = document.getElementById("status"),
  game = document.getElementById("game");

let gameStatus = "ended";

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
      console.log(left, top);
      if (left <= 152) {
        if (top <= 202) endGame();
      }
      if (top >= 208) endGame();
      if (top >= 100 && left >= 158 && left <= 300) endGame();
      if (top <= 52) endGame();
      if (left >= 158 && left <= 300 && top >= 58) endGame();
      if (left >= 306 && top <= 202) endGame();
    }
  });
  removePoinerEvents();
}

function endGame() {
  if (gameStatus === "ended") return;
  statusText.innerText = "Game ended";
  gameStatus = "ended";
}

// Remove mouse interact with childs to avoid bugs and glitches
function removePoinerEvents() {
  start.style.pointerEvents = "none";
  end.style.pointerEvents = "none";
  boundaries.forEach(function (boundary) {
    boundary.style.pointerEvents = "none";
  });
}

start.addEventListener("click", startGame);

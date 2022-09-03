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

  function startGame() {
    // if game is already started do nothing
    if (gameStatus === "started") return;
    statusText.innerText = "Game started";
    gameStatus = "started";
    resetStartPosition();
    game.addEventListener("mousemove", function (e) {
      console.log(e.offsetX, parseFloat(start.style.left.split("px")[0]) + 40);
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
      }
    });
    changePointerEvent("none");
  }

  function endGame() {
    if (gameStatus === "ended") return;
    statusText.innerText = "You lost!";
    gameStatus = "ended";
    changePointerEvent("unset");
  }

  // remove mouse event and interaction with div to avoid glitches and bugs
  function changePointerEvent(_status) {
    start.style.pointerEvents = _status;
    end.style.pointerEvents = _status;
  }

  // reset start box to it's default position
  function resetStartPosition() {
    start.style.top = initialTop + "px";
    start.style.left = initialLeft + "px";
  }

  start.addEventListener("click", function () {
    // if start box is not at initial position return it to there in first click then start game with second click otherwise start game from first click
    if (start.offsetTop == initialTop && start.offsetLeft == initialLeft) {
      startGame();
    } else {
      resetStartPosition();
    }
  });
});

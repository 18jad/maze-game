// load the code when all elements on page are ready
window.addEventListener("load", function () {
  let username;
  getUsername();
  setTimeout(function () {
    alert(
      `Hey ${username}! \n\n- To start the game move your cursor above S box stay inside tha game frame and try to reach the end (E box) without hitting any wall to earn some points. When you lose/win the game move again over the S box and the game will start a new round. \n\n- To reset the game and score press the S box. \n\n\nENJOY! :D`,
    );
  }, 500);
  const start = document.getElementById("start"),
    boundaries = document.querySelectorAll(".boundary"),
    end = document.getElementById("end"),
    statusText = document.getElementById("status"),
    game = document.getElementById("game");

  // game status to check if game is running or no
  let gameStatus = "idle";

  // used for highliting the boundary that the cursor hit
  let changed = 0;

  // for score system
  let score = 0,
    highestScore = 0;

  // to avoid selecting S and E characters inside the start and end box
  start.style.userSelect = "none";
  end.style.userSelect = "none";

  function getUsername() {
    let temp = prompt("Enter your username: ");
    if (temp == null || temp == undefined || temp == "") getUsername();
    username = temp;
    if (username != null || username != undefined || username != "") {
      if (localStorage.getItem("users")) {
        let usernames = jsonToArray(localStorage.getItem("users"));
        // if user already exists in localStorage array do nothing
        if (checkUser(username, usernames)) return;
        usernames.push(username);
        localStorage.setItem("users", JSON.stringify(usernames));
      } else {
        localStorage.setItem("users", JSON.stringify([username]));
      }
    }
  }

  function checkUser(username, users) {
    for (let i = 0; i < users.length; i++) {
      if (username == users[i]) return true;
    }
  }

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
    game.addEventListener("mouseleave", function (e) {
      if (gameStatus === "started") {
        document.body.style.background = "rgba(255, 0, 0, 0.4)";
        alert(
          "Bad boy what are you trying to do?! Don't exit the game frame while it's running I know your purpose :D",
        );
        endGame();
        changed++;
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

      // set username score
      localStorage.setItem(username, score);
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

    // set username score
    localStorage.setItem(username, score);
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
    document.body.style.background = "initial";
  }

  // Scoring system
  var scoreElement = document.createElement("div");
  document.body.appendChild(scoreElement);

  function updateScore(optionalScore = null) {
    // get the max score between current score and last max
    highestScore = Math.max(highestScore, score);
    if (localStorage.getItem("highestScore")) {
      if (localStorage.getItem("highestScore") < score) {
        localStorage.setItem("highestScore", score);
      }
    } else {
      localStorage.setItem("highestScore", highestScore);
    }
    optionalScore == null ? null : (score = optionalScore);
    scoreElement.innerHTML = `<center><h2 style="background-color: #eeeeee; width: fit-content; padding: 20px; border-radius: 10px; border: 1px solid black;">Score: ${score} <br />Highest Score: ${localStorage.getItem(
      "highestScore",
    )}</h2></center>`;
  }

  function resetScore() {
    score = 0;
    highestScore = 0;
    // reset username score
    localStorage.setItem(username, 0);
    updateScore();
  }

  function resetGame() {
    resetStart();
    resetScore();
  }

  function jsonToArray(JS_Obj) {
    var obj = JSON.parse(JS_Obj);
    var res = [];
    for (var i in obj) res.push(obj[i]);
    return res;
  }

  updateScore();
  start.onmouseenter = startGame;
  start.onclick = resetGame;

  // update score if user already existed
  if (localStorage.getItem(username)) {
    updateScore(parseInt(localStorage.getItem(username)));
  }
  if (localStorage.getItem("highestScore")) {
    updateScore();
  }
});

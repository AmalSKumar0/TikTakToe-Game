
// These are button which choose game modes(solo or multiplayer)
let btn1 = document.querySelector("#solo");
let btn2 = document.querySelector("#multi");
let h3 = document.querySelector("#buttonReplace");
let container = document.querySelector(".container");
let game = document.querySelector(".game");
let box = document.querySelectorAll(".box");
let GameText = document.querySelector(".title");
let GameText1 = document.querySelector(".title1");
let ResetBtn = document.querySelector("#reset");
let gameMODE = 0;
let turn = true;
let player1 = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn = true;
};

let board = () => {
  let img = document.querySelector(".image");
  img.setAttribute("src", "matrixImg.png");
  img.setAttribute("class", "Matriximg");
  container.setAttribute("class", "container1");
  game.setAttribute("class", "game1");
  let reset = document.querySelector("#reset");
  reset.textContent = "RESET";
  reset.setAttribute("id", "reset1");

  for (let i = 0; i < 9; i++) {
    box[i].setAttribute("class", "box1");
  }
};


let randomDrop=()=>{
  let rndm=Math.floor(Math.random() * 9);
  console.log(rndm);
  while(box[rndm].value!=""){
      rndm=Math.floor(Math.random() * 9);
  }
  placer(rndm);
};
let temp = [];

let BestPosi = () => {
    for (let i = 0; i < 9; i++) {
        temp[i] = box[i].value;
    }
    for (let i = 0; i < 9; i++) {
        if (temp[i] == "") {
            temp[i] = "x";
            for (let pattern of winPatterns) {
                let post1val = temp[pattern[0]];
                let post2val = temp[pattern[1]];
                let post3val = temp[pattern[2]];

                if (post1val != "" && post2val != "" && post3val != "") {
                    if (post1val == post2val && post2val == post3val && post3val == "x") {
                        placer(i);
                        return;
                    }
                }
                temp[i] = "";
            }
        }
    }
    CircleDroper();
};

let CircleDroper = () => {
    for (let i = 0; i < 9; i++) {
        temp[i] = box[i].value;
    }
    if (temp[4] == "") {
        if ((temp[1] == 'x' && temp[3] == temp[8]) || (temp[1] == 'x' && temp[7] == temp[2])) {
            placer(4);
        } else {
            if (temp[1] == 'x') {
                if (temp[0] == 'x') {
                    placer(2);
                    return;
                } else if (temp[2] == 'x') {
                    placer(0);
                    return;
                }
            } else if (temp[3] == 'x') {
                if (temp[0] == 'x') {
                    placer(6);
                    return;
                } else if (temp[6] == 'x') {
                    placer(0);
                    return;
                }
            } else if (temp[7] == 'x') {
                if (temp[6] == 'x') {
                    placer(8);
                    return;
                } else if (temp[8] == 'x') {
                    placer(6);
                    return;
                }
            } else if (temp[5] == 'x') {
                if (temp[2] == 'x') {
                    placer(8);
                    return;
                } else if (temp[8] == 'x') {
                    placer(6);
                    return;
                }
            } else {
                randomDrop();
            }
        }
    } else {
        StarDroper();
    }
};

let StarDroper = () => {
    for (let i = 0; i < 9; i++) {
        temp[i] = box[i].value;
    }
    if (temp[0] == ' ' && temp[8] == temp[4]) {
        placer(0);
        return;
    } else if (temp[8] == ' ' && temp[0] == temp[4]) {
        placer(8);
        return;
    } else if (temp[1] == ' ' && temp[6] == temp[4]) {
        placer(1);
        return;
    } else if (temp[7] == ' ' && temp[1] == temp[4]) {
        placer(7);
        return;
    } else if (temp[2] == ' ' && temp[6] == temp[4]) {
        placer(2);
        return;
    } else if (temp[6] == ' ' && temp[2] == temp[4]) {
        placer(6);
        return;
    } else if (temp[5] == ' ' && temp[3] == temp[4]) {
        placer(5);
        return;
    } else if (temp[3] == ' ' && temp[5] == temp[4]) {
        placer(3);
        return;
    } else {
        randomDrop();
    }
};

let placer = (i) => {
    box[i].innerHTML = "<img class='picture1' src='x.png' alt=''>";
    box[i].setAttribute("value", "x");
    box[i].disabled = true;
};

let AIPlayer = (difficulty) => {
    if (difficulty == "easy") {
        randomDrop();
    } else if (difficulty == "medium") {
        CircleDroper();
    } else {
        BestPosi();
    }
};


let chechWinnerMulti=(playerName,difficulty)=>{
  let dr = true;
  for (let i = 0; i < 9; i++) {
    if (box[i].value == "") {
      dr = false;
    }
  }
  for (let pattern of winPatterns) {
    let post1val = box[pattern[0]].value;
    let post2val = box[pattern[1]].value;
    let post3val = box[pattern[2]].value;

    if (post1val != "" && post2val != "" && post3val != "") {
      if (post1val == post2val && post2val == post3val) {
        dr = false;
        showWinnerMulti(post1val, playerName,difficulty);
        return false;
      }
    }
  }
  if (dr) {
    drawMulti(playerName,difficulty);
    return false;
  }
  return true;
};

let drawMulti=(playerName,difficulty)=>{
  ResetBtn.innerText = "NEW GAME";
  GameText1.innerText = `Its a draw, try again`;
  DisableButtons(); //disable the buttons after the winner is found
  ResetBtn.addEventListener("click", () => {
    EnableButtonMulti(playerName,difficulty);
  });
}
let showWinnerMulti=(post1val,playerName,difficulty)=>{
     if(post1val=="o"){
      GameText1.innerText = `Congratulations, Winner is ${playerName}`;
     }
     else
     {
      GameText1.innerText = `${playerName} lost :( Try again`;
     }
     ResetBtn.innerText = "NEW GAME";
     DisableButtonsMulti(); //disable the buttons after the winner is found
     ResetBtn.addEventListener("click", () => {
          EnableButtonMulti(playerName,difficulty);
     });
};

const DisableButtonsMulti = () => {
  for (let boxes of box) {
    boxes.disabled = true;
  }
};


const EnableButtonMulti = (playerName,difficulty) => {
  GameText1.innerText = `${playerName} VS AI and mode:${difficulty}`;
  ResetBtn.innerText = "RESET";
  for (let boxes of box) {
    boxes.setAttribute("value", "");
    boxes.innerHTML = "<img class='picture1' src='' alt=''>";
    boxes.disabled = false;
    console.log(boxes);
  }
};

btn1.onclick = () => {
  h3.setAttribute("class", "pol");
  h3.innerHTML =
    "<form id='playerForm'><label for='playerName'>Player Name:</label><input type='text' id='playerName' name='playerName' required><br><label for='difficulty'>Difficulty:</label> <div class='radio'><input type='radio' id='rad1' name='difficulty' value='easy'><label class='Label' for='rad1'>Easy</label><input type='radio' id='rad2' name='difficulty' value='medium'><label class='Label' for='rad2'>Medium</label><input type='radio' id='rad3' name='difficulty' value='hard'><label class='Label' for='rad3'>Hard</label></div><br><button class='startGame' type='submit'>Start Game</button></form>";
  document
    .getElementById("playerForm")
    .addEventListener("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Access the player name input field
      var playerNameInput = document.getElementById("playerName");
      var difficulty = document.querySelector(
        'input[name="difficulty"]:checked'
      ).value; // Get selected difficulty
      // Get the value entered by the user in the player name input field
      var playerName = playerNameInput.value;
      startGame(playerName, difficulty);
    });

  function startGame(playerName, difficulty) {
    h3.innerHTML = "";
    GameText.textContent = "TIC TAC TOE";
    GameText1.textContent = `${playerName} VS AI and mode:${difficulty}`;
    board();
    box.forEach((boxes) => {
      boxes.addEventListener("click", () => {
          boxes.innerHTML =
            "<img class='picture1' src='o.png' alt=''>";
          boxes.setAttribute("value", "o");
          turn = false;
          boxes.disabled = true;
          if(chechWinnerMulti(playerName,difficulty)){
          AIPlayer(difficulty);
          }
          chechWinnerMulti(playerName,difficulty);
      });
    });
  }
};




btn2.onclick = () => {
  h3.setAttribute("class", "pol");
  h3.innerHTML =
    "<form id='playerForm'><label for='playerName1'>First Player:</label><input type='text' id='playerName1' name='playerName1' required><br><label for='playerName2'>Second Player:</label><input type='text' id='playerName2' name='playerName2' required></br><button class='startGame' type='submit'>Start Game</button></form>";
  document
    .getElementById("playerForm")
    .addEventListener("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Access the player name input field
      let playerNameInputOne = document.getElementById("playerName1");
      let playerNameInputTwo = document.getElementById("playerName2");
      // Get the value entered by the user in the player name input field
      let playerNameOne = playerNameInputOne.value;
      let playerNameTwo = playerNameInputTwo.value;
      startGameMulti(playerNameOne, playerNameTwo);
    });

  function startGameMulti(playerNameOne, playerNameTwo) {
    h3.innerHTML = "";
    GameText.textContent = "TIC TAC TOE";
    GameText1.textContent = `${playerNameOne}(O) VS ${playerNameTwo}(X)`;
    board();

    box.forEach((boxes) => {
      boxes.addEventListener("click", () => {
        if (turn) {
          boxes.innerHTML =
            "<img class='picture1' src='o.png' alt=''>";
          boxes.setAttribute("value", "o");
          turn = false;
        } else {
          boxes.innerHTML =
            "<img class='picture1' src='x.png' alt=''>";
          boxes.setAttribute("value", "x");
          turn = true;
        }
        boxes.disabled = true;
        checkWinner(playerNameOne, playerNameTwo);
      });
    });
  }
};

//check for the win
let checkWinner = (playerNameOne, playerNameTwo) => {
  let dr = true;
  for (let i = 0; i < 9; i++) {
    if (box[i].value == "") {
      dr = false;
    }
  }
  for (let pattern of winPatterns) {
    let post1val = box[pattern[0]].value;
    let post2val = box[pattern[1]].value;
    let post3val = box[pattern[2]].value;

    if (post1val != "" && post2val != "" && post3val != "") {
      if (post1val == post2val && post2val == post3val) {
        dr = false;
        showWinner(post1val, playerNameOne, playerNameTwo);
      }
    }
  }
  if (dr) {
    draw(playerNameOne, playerNameTwo);
  }
};

//diables all the buttons
const DisableButtons = () => {
  for (let boxes of box) {
    boxes.disabled = true;
  }
};

//This will refresh the game board for a fresh start for both players
const EnableButton = (playerNameOne, playerNameTwo) => {
  GameText1.innerText = `${playerNameOne}(O) VS ${playerNameTwo}(X)`;
  ResetBtn.innerText = "RESET";
  for (let boxes of box) {
    boxes.disabled = false;
    boxes.setAttribute("value", "");
    boxes.innerHTML = "<img class='picture1' src='' alt=''>";
  }
};
//function for displaying winner of the multiplayer mode
const showWinner = (postgame, playerNameOne, playerNameTwo) => {
  if (postgame == "o") {
    GameText1.innerText = `Congratulations, Winner is ${playerNameOne}`;
  } else if (postgame == "x") {
    GameText1.innerText = `Congratulations, Winner is ${playerNameTwo}`;
  }
  ResetBtn.innerText = "NEW GAME";
  DisableButtons(); //disable the buttons after the winner is found
  ResetBtn.addEventListener("click", () => {
    EnableButton(playerNameOne, playerNameTwo);
  });
};
//function for displaying if the game is a draw
const draw = (playerNameOne, playerNameTwo) => {
  GameText1.innerText = `THE GAME IS A DRAW`;
  ResetBtn.innerText = "NEW GAME";
  DisableButtons(); //disable the buttons after the winner is found
  ResetBtn.addEventListener("click", () => {
    EnableButton(playerNameOne, playerNameTwo);
  });
};



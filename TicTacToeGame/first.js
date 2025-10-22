const boxes = document.querySelectorAll(".box");
const winDisplay = document.getElementById("win");
const newGameBtn = document.getElementById("new");
const resetBtn = document.getElementById("reset");

let board = Array(9).fill("");
let turnO = true;
let gameActive = true;

const PLAYER_O = "O";
const PLAYER_X = "X";

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize or restart the game
function initGame(randomStart = false) {
  board.fill("");
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.color = "#d63447";
    box.style.backgroundColor = "#aad4d4";
  });

  gameActive = true;
  turnO = randomStart ? Math.random() < 0.5 : true;
  updateTurnDisplay();
}

// Handle box click
function handleBoxClick(e) {
  const index = [...boxes].indexOf(e.target);

  if (!gameActive || board[index]) return;

  const currentPlayer = turnO ? PLAYER_O : PLAYER_X;
  board[index] = currentPlayer;
  e.target.innerText = currentPlayer;
  e.target.style.color = currentPlayer === PLAYER_O ? "#f9f871" : "#d63447";

  if (checkWinner(currentPlayer)) {
    gameActive = false;
    highlightWinningCombo(currentPlayer);
    setTimeout(() => {
      winDisplay.innerText = `🎉 Player ${currentPlayer} wins!`;
      disableAllBoxes();
    }, 200);
  } else if (board.every((cell) => cell !== "")) {
    gameActive = false;
    winDisplay.innerText = "🤝 It's a draw!";
  } else {
    turnO = !turnO;
    updateTurnDisplay();
  }
}

// Check if player has won
function checkWinner(player) {
  return WINNING_COMBOS.some(([a, b, c]) => {
    return board[a] === player && board[b] === player && board[c] === player;
  });
}

// Highlight winning combination
function highlightWinningCombo(player) {
  WINNING_COMBOS.forEach(([a, b, c]) => {
    if (board[a] === player && board[b] === player && board[c] === player) {
      [a, b, c].forEach((i) => {
        boxes[i].style.backgroundColor = "#4caf50";
        boxes[i].style.color = "#fff";
      });
    }
  });
}

// Disable all boxes
function disableAllBoxes() {
  boxes.forEach((box) => (box.disabled = true));
}

// Update UI turn message
function updateTurnDisplay() {
  winDisplay.innerText = `Player ${turnO ? PLAYER_O : PLAYER_X}'s turn`;
}

// Event listeners
boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
newGameBtn.addEventListener("click", () => initGame(true));
resetBtn.addEventListener("click", () => initGame(false));

// Start initial game
initGame();

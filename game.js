const readline = require('readline');

// Started by Sediqa
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = '❌';
let gameMode = '';

function printBoard() {
  console.log(`
   ${board[0]} | ${board[1]} | ${board[2]}
  -----------
   ${board[3]} | ${board[4]} | ${board[5]}
  -----------
   ${board[6]} | ${board[7]} | ${board[8]}
  `);
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];
  return winPatterns.some(p =>
    board[p[0]] === player &&
    board[p[1]] === player &&
    board[p[2]] === player
  );
}

function getEmptyPositions() {
  return board.map((val, idx) => val === ' ' ? idx : null).filter(v => v !== null);
}

function playerMove() {
  rl.question(`Player ${currentPlayer}, enter position (0-8): `, (move) => {
    move = parseInt(move, 10);
    if (board[move] !== ' ' || isNaN(move) || move < 0 || move > 8) {
      console.log("⚠️ Invalid move. Try again.");
      return playerMove();  // Recursively ask again
    }
    board[move] = currentPlayer;
    checkGameStatus();
  });
}

function computerMove() {
  const empty = getEmptyPositions();
  const move = empty[Math.floor(Math.random() * empty.length)];
  console.log(`💻 Computer chose position ${move}`);
  board[move] = '⭕️';
  checkGameStatus();
}

function checkGameStatus() {
  if (checkWin(currentPlayer)) {
    printBoard();
    console.log(`🎉 Player ${currentPlayer} wins!`);
    rl.close();  // Close the game
  } else if (getEmptyPositions().length === 0) {
    printBoard();
    console.log("🤝 It's a draw!");
    rl.close();  // Close the game
  } else {
    currentPlayer = currentPlayer === '❌' ? '⭕️' : '❌';
    if (gameMode === '1' && currentPlayer === '⭕️') {
      computerMove();  // Computer's turn in single-player mode
    } else {
      printBoard();    // Print the board after each move
      playerMove();    // Ask for next player's move
    }
  }
}

function playGame() {
  rl.question("Choose mode: '1' for Single Player, '2' for Multiplayer: ", (mode) => {
    if (mode !== '1' && mode !== '2') {
      console.log("⚠️ Invalid choice. Please restart and try again.");
      rl.close();
      return;
    }

    gameMode = mode;
    printBoard();
    playerMove();  // Start the game with Player X's move
  });
}

playGame();

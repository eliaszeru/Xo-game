const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = '❌';
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
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]           
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
      return playerMove();  
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
  board[move] = '⭕️';
  checkGameStatus();
}

function checkGameStatus() {
  if (checkWin(currentPlayer)) {
    printBoard();
    console.log(`🎉 Player ${currentPlayer} wins!`);
    rl.close();  
  } else if (getEmptyPositions().length === 0) {
    printBoard();
    console.log("🤝 It's a draw!");
    rl.close();  
  } else {
    currentPlayer = currentPlayer === '❌' ? '⭕️' : '❌';
    if (gameMode === '1' && currentPlayer === '⭕️') {
      computerMove();  
    } else {
      printBoard();    
      playerMove();    
    }
  }
}

function playGame() {
  rl.question(" In order to play this game you have to apply the index concept in array that we have learnt last week. now to start the   game Choose mode: '1' for Single Player, '2' for Multiplayer: ", (mode) => {
    if (mode !== '1' && mode !== '2') {
      console.log("⚠️ Invalid choice. Please restart and try again.");
      rl.close();
      return;
    }

    

    gameMode = mode;
    printBoard();
    playerMove();
  });
}

playGame();

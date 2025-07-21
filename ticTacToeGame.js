//GameBoard should store and the gameboard and provide methods for updating the board.
const GameBoard = (function () {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const updateBoard = (row, collumn, value) => {
    board[row][collumn] = value;
  };

  const getPositionValue = (row, collumn) => {
    return board[row][collumn];
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let u = 0; u < 3; u++) {
        board[i][u] = null;
      }
    }
  };

  const printBoard = () => {
    for (let i = 0; i < 3; i++) {
      console.log(board[i]);
    }
  };
  return { updateBoard, getPositionValue, resetBoard, printBoard };
})();

//GameController should handle actions such as taking player turns and using methods provided by GameBoard to update the board after player turns.
const GameController = (function () {
  const player1Name = "Player 1";
  const player2Name = "Player 2";

  const players = [
    {
      name: player1Name,
      token: "X",
    },
    {
      name: player2Name,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchTurns = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const resetActivePlayer = () => (activePlayer = players[0]);

  const checkForWin = () => {
    let condition = activePlayer.token;
    for (let i = 0; i < 3; i++) {
      //Check each row for horizontal win
      if (
        GameBoard.getPositionValue(i, 0) === condition &&
        GameBoard.getPositionValue(i, 1) === condition &&
        GameBoard.getPositionValue(i, 2) === condition
      ) {
        console.log(`${activePlayer.name} Wins`);
        return true;
      }
      if (
        GameBoard.getPositionValue(0, i) === condition &&
        GameBoard.getPositionValue(1, i) === condition &&
        GameBoard.getPositionValue(2, i) === condition
      ) {
        console.log(`${activePlayer.name} Wins`);
        return true;
      }
    }
    if (
      GameBoard.getPositionValue(0, 0) === condition &&
      GameBoard.getPositionValue(1, 1) === condition &&
      GameBoard.getPositionValue(2, 2) === condition
    ) {
      console.log(`${activePlayer.name} Wins`);
      return true;
    }

    if (
      GameBoard.getPositionValue(0, 2) === condition &&
      GameBoard.getPositionValue(1, 1) === condition &&
      GameBoard.getPositionValue(2, 0) === condition
    ) {
      console.log(`${activePlayer.name} Wins`);
      return true;
    }

    return false;
  };

  const attemptTurn = (row, collumn) => {
    if (GameBoard.getPositionValue(row, collumn) === null) {
      GameBoard.updateBoard(row, collumn, activePlayer.token);
      //checkForWin();
      //switchTurns();
      return true;
    } else {
      return false;
    }
  };

  return {
    switchTurns,
    getActivePlayer,
    attemptTurn,
    checkForWin,
    resetActivePlayer,
  };
})();

const screenController = (function () {
  const boardContainer = document.querySelector(".inner-cells");
  const gridCells = Array.from(boardContainer.children);
  const winPopup = document.getElementById("win-popup");
  const winText = document.getElementById("win-text");
  const winTextClose = document.getElementById("win-text-close");
  const newGameButton = document.getElementById("new-game-button");
  const gameText = document.getElementById("game-text");

  winTextClose.addEventListener("click", function () {
    winPopup.close();
  });

  const displayWin = (winBoolean) => {
    if (winBoolean === true) {
      winText.textContent = GameController.getActivePlayer().name + " Wins";
      winPopup.showModal();
    } else {
      GameController.switchTurns();
      gameText.textContent = GameController.getActivePlayer().name + " Turn: ";
    }
  };

  gridCells.forEach((button) => {
    const [rowNum, collumnNum] = button.id.split("-").map(Number);
    button.addEventListener("click", function (event) {
      const turnTaken = GameController.attemptTurn(rowNum, collumnNum);
      if (turnTaken === true) {
        button.textContent = GameController.getActivePlayer().token;
        const gameOver = GameController.checkForWin();
        displayWin(gameOver);
      }
    });
  });

  newGameButton.addEventListener("click", function () {
    GameController.resetActivePlayer();
    GameBoard.resetBoard();
    gridCells.forEach((button) => (button.textContent = ""));
    gameText.textContent = "Player 1 Turn:";
  });
})();

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
      checkForWin();
      switchTurns();
      return true;
    } else {
      return false;
    }
  };

  return { switchTurns, getActivePlayer, attemptTurn, checkForWin };
})();

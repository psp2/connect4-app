import React from "react";
import "./Board.scss";

function Board(props) {
  function attemptMove(col) {
    props.makeMove(col);
  }

  function displayToken(token, row, col) {
    if (token === 0) {
      return (
        <div onClick={() => attemptMove(col)} className="WhiteSpace"></div>
      );
    } else if (token === 1) {
      return <div className="YellowToken"></div>;
    } else if (token === 2) {
      return <div className="RedToken"></div>;
    }
  }

  function displayRow(row, rowIndex) {
    return (
      <div className="BoardRow">
        {row.map((token, colIndex) => displayToken(token, rowIndex, colIndex))}
      </div>
    );
  }

  return (
    <div className="Board">
      {props.gameState &&
        props.gameState.map((row, rowIndex) => displayRow(row, rowIndex))}
    </div>
  );
}

export default Board;

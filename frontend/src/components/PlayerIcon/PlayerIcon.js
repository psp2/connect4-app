import React from "react";
import { Button } from "react-bootstrap";
import "./PlayerIcon.scss";

function PlayerIcon(props) {
  function forfeitGame() {
    props.endGame(true);
  }

  return (
    <div className="PlayerIcon">
      <div className="PlayerInfo">
        <div>Player {props.playerNumber}:</div>
        <div>{props.playerName}</div>
      </div>
      <div className="PlayerPicture">Insert Picture Here!</div>
      {props.playerNumber === 1 && (
        <div className="PlayerButtons">
          <Button className="Player1IconButton">UNDO</Button>
          <Button className="Player1IconButton">RESTART</Button>
          <Button onClick={forfeitGame} className="Player1IconButton">
            FORFEIT
          </Button>
        </div>
      )}
      {props.playerNumber === 2 && (
        <div className="PlayerButtons">
          <Button className="Player2IconButton">UNDO</Button>
          <Button className="Player2IconButton">RESTART</Button>
          <Button onClick={forfeitGame} className="Player2IconButton">
            FORFEIT
          </Button>
        </div>
      )}
    </div>
  );
}

export default PlayerIcon;

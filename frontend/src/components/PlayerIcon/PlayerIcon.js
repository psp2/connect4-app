import React from "react";
import { Button } from "react-bootstrap";
import "./PlayerIcon.scss";

function PlayerIcon(props) {
  function forfeitGame() {
    props.endGame(true);
  }

  function undo() {
    var base_url = 'http://127.0.0.1:5000/undo?id='
    var url = base_url.concat(props.gameId)
    fetch(url, {method: 'post'})
    .then(response => response.json())
    .then(data => {
      props.setGameState([data['turn'], data['state']])
      console.log(data)
    })
  }

  function restart() {
    var base_url = 'http://127.0.0.1:5000/restart?id='
    var url = base_url.concat(props.gameId)
    fetch(url, {method: 'put'})
    .then(response => response.json())
    .then(data => {
      props.setGameState([data['turn'], data['state']])
      console.log(data)
    })
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
          <Button className="Player1IconButton" onClick={undo}>UNDO</Button>
          <Button className="Player1IconButton" onClick={restart}>RESTART</Button>
          <Button onClick={forfeitGame} className="Player1IconButton">
            FORFEIT
          </Button>
        </div>
      )}
      {props.playerNumber === 2 && (
        <div className="PlayerButtons">
          <Button className="Player2IconButton" onClick={undo}>UNDO</Button>
          <Button className="Player2IconButton" onClick={restart}>RESTART</Button>
          <Button onClick={forfeitGame} className="Player2IconButton">
            FORFEIT
          </Button>
        </div>
      )}
    </div>
  );
}

export default PlayerIcon;

import React from "react";
import { Button } from "react-bootstrap";
import "./PlayerIcon.scss";

function PlayerIcon(props) {
  function forfeitGame(turn) {
    var base_url = 'http://127.0.0.1:5000/quit?id='
    var url = base_url.concat(props.gameId, '&turn=', turn)
    fetch(url, {method: 'put'})
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    props.endGame(true);
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
      {props.playerNumber === 1 && (<div className="PlayerPicture1"></div>)}
      {props.playerNumber === 2 && (<div className="PlayerPicture2"></div>)}
      {props.playerNumber === 1 && (
        <div className="PlayerButtons">
          <Button className="Player1IconButton" onClick={props.undo}>UNDO</Button>
          <Button className="Player1IconButton" onClick={restart}>RESTART</Button>
          <Button onClick={() => forfeitGame(1)} className="Player1IconButton">
            FORFEIT
          </Button>
        </div>
      )}
      {props.playerNumber === 2 && (
        <div className="PlayerButtons">
          <Button className="Player2IconButton" onClick={props.undo}>UNDO</Button>
          <Button className="Player2IconButton" onClick={restart}>RESTART</Button>
          <Button onClick={() => forfeitGame(2)} className="Player2IconButton">
            FORFEIT
          </Button>
        </div>
      )}
    </div>
  );
}

export default PlayerIcon;

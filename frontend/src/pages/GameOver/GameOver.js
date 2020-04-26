import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./GameOver.scss";
import Scoreboard from "../../components/Scoreboard/Scoreboard";
import { defaultProps } from "recompose";

function GameOver(props) {
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player1Losses, setPlayer1Losses] = useState(0);
  const [player1Ties, setPlayer1Ties] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [player2Losses, setPlayer2Losses] = useState(0);
  const [player2Ties, setPlayer2Ties] = useState(0);
  const [rematchRedirect, setRematchRedirect] = useState(false);
  const [menuRedirect, setMenuRedirect] = useState(false);

  useEffect(() => {
    var url = 'http://127.0.0.1:5000/leaderboard';
    fetch(url, {method: 'get'})
    .then(response => response.json())
    .then(data => {
      let i = data.leaderboard.length;
      let player1 = find_player(props.name1, data.leaderboard);//data.leaderboard[i-2];
      let player2 = find_player(props.name2, data.leaderboard);
      setPlayer1Wins(player1.wins);
      setPlayer1Losses(player1.losses);
      setPlayer1Ties(player1.ties);
      setPlayer2Wins(player2.wins);
      setPlayer2Losses(player2.losses);
      setPlayer2Ties(player2.ties);
    })
  }, []);

  function rematch() {
    setRematchRedirect(true);
  }

  function find_player(name, data) {
    for (var i = 0; i < data.length; i++) {
      var object = data[i];
      console.log(object.name)
      if (object.name === name) {
        return object;
      }
    }
    //Name does not exist
    return {wins: -1, losses: -1, ties: -1};
  }

  function returnToMenu() {
    setMenuRedirect(true);
  }

  if (rematchRedirect) {
    var base_url = 'http://127.0.0.1:5000/restart?id='
    var url = base_url.concat(props.gameId)
    fetch(url, {method: 'put'})
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })

    return <Redirect to="/game" />;
  }

  if (menuRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="GameOver">
      <div>
        <div className="PlayAgain">PLAY AGAIN?</div>
      </div>
      <div className="GameOverRow">
        <Scoreboard
          player1Name={props.name1}
          player1Wins={player1Wins}
          player1Ties={player1Ties}
          player1Losses={player1Losses}
          player2Name={props.name2}
          player2Wins={player2Wins}
          player2Ties={player2Ties}
          player2Losses={player2Losses}
        />
        <div className="GameOverButtonsArea">
          <Button onClick={rematch} className="GameOverButton">
            REMATCH
          </Button>
          <Button onClick={returnToMenu} className="GameOverButton">
            MAIN MENU
          </Button>
          <Button className="GameOverButton" onClick={returnToMenu}>QUIT</Button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;

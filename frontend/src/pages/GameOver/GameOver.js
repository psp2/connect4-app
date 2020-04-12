import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./GameOver.scss";
import Scoreboard from "../../components/Scoreboard/Scoreboard";

function GameOver() {
  const [winner, setWinner] = useState(null);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [rematchRedirect, setRematchRedirect] = useState(false);
  const [menuRedirect, setMenuRedirect] = useState(false);

  useEffect(() => {
    // TEMP until API implemented
    var api_score1 = 3;
    var api_player1 = "Prashant";
    var api_score2 = 2;
    var api_player2 = "Vivek";

    if (api_score2 > api_score1) {
      setWinner(api_player2);
      setPlayer1Name(api_player2);
      setPlayer1Score(api_score2);
      setPlayer2Name(api_player1);
      setPlayer2Score(api_score1);
    } else {
      setWinner(api_player1);
      setPlayer1Name(api_player1);
      setPlayer1Score(api_score1);
      setPlayer2Name(api_player2);
      setPlayer2Score(api_score2);
    }
  }, []);

  function rematch() {
    setRematchRedirect(true);
  }

  function returnToMenu() {
    setMenuRedirect(true);
  }

  if (rematchRedirect) {
    // Will need to add more once API implemented, multiple games enabled
    // Will also need to wait for other player to "accept" if in multi-player mode
    return <Redirect to="/game" />;
  }

  if (menuRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="GameOver">
      {winner && (
        <div>
          <div className="Winner">WINNER: </div>
          <div className="Winner">{winner}!</div>
        </div>
      )}
      {!winner && (
        <div>
          <div className="Winner">STALEMATE!</div>
        </div>
      )}
      <div className="GameOverRow">
        <Scoreboard
          player1Name={player1Name}
          player1Score={player1Score}
          player2Name={player2Name}
          player2Score={player2Score}
        />
        <div className="GameOverButtonsArea">
          <Button onClick={rematch} className="GameOverButton">
            REMATCH
          </Button>
          <Button onClick={returnToMenu} className="GameOverButton">
            MAIN MENU
          </Button>
          <Button className="GameOverButton">QUIT</Button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;

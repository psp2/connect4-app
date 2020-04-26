import React, { useState, useEffect } from "react";
import "./Game.scss";
import { Redirect } from "react-router-dom";
import Board from "../../components/Board/Board";
import PlayerIcon from "../../components/PlayerIcon/PlayerIcon.js";
import InvalidMove from "../../components/InvalidMove/InvalidMove.js";

function Game(props) {
  // Must add API call here
  const [gameState, setGameState] = useState([1, null]);
  // Used to determine if the last move was valid or not
  const [prevPlayer, setPrevPlayer] = useState(1);
  const [lastMoveValid, setLastMoveValid] = useState(true);
  const [endGame, setEndGame] = useState(false);
  const [endGameRedirect, setEndGameRedirect] = useState(false);

  if (endGameRedirect) {
    return <Redirect to="/gameover" />;
  }

  function updateGameState(col) {
    var base_url = 'http://127.0.0.1:5000/place_token?id='
    const url = base_url.concat(props.gameId, '&col=',col)
    fetch(url, {method: "post"})
    .then(response => response.json())
    .then(data => {
      setGameState([data['turn'], data['state']])
      console.log(data)
      if (data['game_status'] !== 0) {
        setEndGame(true);
      }
      // If the player hasn't changed between moves, the move was invalid.
      if (data['response'] === false) {
        setLastMoveValid(false);
      } else {
        setPrevPlayer(data['prev']);
        setLastMoveValid(true);
      }
    })
    .catch(err => console.error(err))
  }

  function undo() {
    var base_url = 'http://127.0.0.1:5000/undo?id='
    var url = base_url.concat(props.gameId)
    fetch(url, {method: 'post'})
    .then(response => response.json())
    .then(data => {
      setGameState([data['turn'], data['state']])
      console.log(data)
    })
  }

  function state() {
    var base_url = 'http://127.0.0.1:5000/state?id='
    var url = base_url.concat(props.gameId)
    fetch(url, {method: 'get'})
    .then(response => response.json())
    .then(data => {
      setGameState([data['turn'], data['state']])
      if(data['p1'] !== 'null') {
        props.setName1(data['p1'])
        props.setName2(data['p2'])
      }
      console.log(data)
    })
  }

  return (
    <div className="Game" onClick={state}>
      <div className="GameZone">
        <div className="Player1_Zone">
          <PlayerIcon
            playerNumber={1}
            playerName={props.name1}
            endGame={setEndGame}
            gameId={props.gameId}
            setGameState={setGameState}
            prevPlayer={prevPlayer}
            undo={undo}
          />
        </div>
        <div>
          <Board
            player={gameState[0]}
            gameState={gameState[1]}
            makeMove={updateGameState}
          />
          {gameState[1] == null && <div className="GameStartbutton" onClick={state}>
            START
            </div>}
          {endGame && <div className="GameStartbutton">
            GAME OVER!
            <div className="BackButtonGreen" onClick={() => setEndGameRedirect(true)}>
              Continue
            </div>
          </div>}
        </div>
        <div className="Player2_Zone">
          <PlayerIcon
            playerNumber={2}
            playerName={props.name2}
            endGame={setEndGame}
            gameId={props.gameId}
            setGameState={setGameState}
            prevPlayer={prevPlayer}
            undo={undo}
          />
        </div>
      </div>
      <div className="CurrentPlayer">Player Turn: {gameState[0]}</div>
      {!lastMoveValid && (
        <InvalidMove invalidMessageReceived={setLastMoveValid} />
      )}
    </div>
  );
}

export default Game;

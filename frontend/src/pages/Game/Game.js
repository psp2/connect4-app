import React, { useState } from "react";
import "./Game.scss";
import { Redirect } from "react-router-dom";
import Board from "../../components/Board/Board";
import PlayerIcon from "../../components/PlayerIcon/PlayerIcon.js";
import InvalidMove from "../../components/InvalidMove/InvalidMove.js";

function Game(props) {
  // TEMP; FOR DEMO DISPLAY
  const temp_6 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];
  // TEMP; FOR DEMO DISPLAY
  const temp_7 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  // TEMP; FOR DEMO DISPLAY
  const temp_8 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // Must add API call here
  const [gameState, setGameState] = useState([1, temp_6]);
  // Used to determine if the last move was valid or not
  const [prevPlayer, setPrevPlayer] = useState(1);
  const [lastMoveValid, setLastMoveValid] = useState(true);
  const [endGame, setEndGame] = useState(false);

  // const base_url = 'http://127.0.0.1:5000/start?size='
  // const url = base_url.concat(6, '&difficulty=', 5, '&p1=', 'Test1', '&p2=', 'Test2')
  // fetch(url, {method: 'put'})
  // .then(response => response.json())
  // .then(data => {
  //   setGameId(data['id'])
  //   setGameState([1, data['state']])
  //   console.log(data)
  // })
  // .catch(err => console.error(err))

  if (endGame) {
    return <Redirect to="/gameover" />;
  }

  function updateGameState(col) {
    // TODO: Make API Call and set game state accordingly!

    // TEMP; FOR WEEK 1 DEMO ONLY
    const api_res = [
      1,
      [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 1, 0, 0, 0],
        [0, 0, 2, 1, 1, 0, 0, 0],
        [0, 2, 1, 2, 2, 1, 0, 0],
      ],
    ];
    // setGameState(api_res);
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

    // If the returned board is empty, the game is over.

  }

  return (
    <div className="Game">
      <div className="GameZone">
        <div className="Player1_Zone">
          <PlayerIcon
            playerNumber={1}
            playerName="Prashant"
            endGame={setEndGame}
            gameId={props.gameId}
            setGameState={setGameState}
            prevPlayer={prevPlayer}
          />
        </div>
        <div>
          <Board
            player={gameState[0]}
            gameState={gameState[1]}
            makeMove={updateGameState}
          />
        </div>
        <div className="Player2_Zone">
          <PlayerIcon
            playerNumber={2}
            playerName="Vivek"
            endGame={setEndGame}
            gameId={props.gameId}
            setGameState={setGameState}
            prevPlayer={prevPlayer}
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

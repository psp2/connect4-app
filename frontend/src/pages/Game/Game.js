import React, { useState } from "react";
import "./Game.scss";
import { Redirect } from "react-router-dom";
import Board from "../../components/Board/Board";
import PlayerIcon from "../../components/PlayerIcon/PlayerIcon.js";
import InvalidMove from "../../components/InvalidMove/InvalidMove.js";

function Game() {
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
  const [gameState, setGameState] = useState([1, temp_8]);
  // Used to determine if the last move was valid or not
  const [prevPlayer, setPrevPlayer] = useState(1);
  const [lastMoveValid, setLastMoveValid] = useState(true);
  const [endGame, setEndGame] = useState(false);

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
    setGameState(api_res);
    // If the returned board is empty, the game is over.
    if (api_res[1] === []) {
      setEndGame(true);
    }
    // If the player hasn't changed between moves, the move was invalid.
    if (api_res[0] === prevPlayer) {
      setLastMoveValid(false);
    } else {
      setPrevPlayer(api_res[0]);
      setLastMoveValid(true);
    }
  }

  return (
    <div className="Game">
      <div className="GameZone">
        <div className="Player1_Zone">
          <PlayerIcon
            playerNumber={1}
            playerName="Prashant"
            endGame={setEndGame}
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

import React, { useState } from "react";
import "./Menus.scss";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

import StartMenu from "../../components/StartMenu/StartMenu";
import GameModes from "../../components/GameModes/GameModes";
import GameSettings from "../../components/GameSettings/GameSettings";

function Menus() {
  const [gameRedirect, setGameRedirect] = useState(false);
  const [numPlayers, setNumPlayers] = useState(0);
  const [gameMode, setGameMode] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [name1, setName1] = useState(null);
  const [name2, setName2] = useState(null);
  const [boardSize, setBoardSize] = useState(0);

  if (gameRedirect) {
    return <Redirect to="/game" />;
  }

  function selectPlayerNumber(number) {
    setNumPlayers(number);
  }

  function selectGameMode(mode) {
    setGameMode(mode);
  }

  function submitGameSettings(diff, name1, name2, size) {
    setDifficulty(diff);
    setName1(name1);
    setName2(name2);
    setBoardSize(size);
    // Do stuff with API here!
    // Submit AI diff, name1, name 2, boardSize, gameMode
    setGameRedirect(true);
  }

  function resetGameSettings() {
    setDifficulty(null);
    setName1(null);
    setName2(null);
    setBoardSize(null);
  }

  return (
    <div className="Menu">
      {numPlayers === 0 && (
        <StartMenu changeNumberPlayers={selectPlayerNumber} />
      )}
      {numPlayers > 0 && gameMode === 0 && (
        <GameModes
          changeGameMode={selectGameMode}
          numPlayers={numPlayers}
          resetPlayers={selectPlayerNumber}
        />
      )}
      {numPlayers > 0 && gameMode > 0 && (
        <GameSettings
          numPlayers={numPlayers}
          resetPlayers={selectPlayerNumber}
          resetGameMode={selectGameMode}
          submitSettings={submitGameSettings}
          resetSettings={resetGameSettings}
        />
      )}
    </div>
  );
}

export default compose(withRouter)(Menus);

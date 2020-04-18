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
  const [difficulty, setDifficulty] = useState(0);
  const [name, setName] = useState("");
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

  function selectGameSettings(diff, name, size) {
    setDifficulty(diff);
    setName(name);
    setBoardSize(size);
    // Do stuff with API here!
    setGameRedirect(true);
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
          submitSettings={selectGameSettings}
        />
      )}
    </div>
  );
}

export default compose(withRouter)(Menus);

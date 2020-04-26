import React, { useState } from "react";
import "./Menus.scss";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

import StartMenu from "../../components/StartMenu/StartMenu";
import GameModes from "../../components/GameModes/GameModes";
import GameSettings from "../../components/GameSettings/GameSettings";

function Menus(props) {
  const [gameRedirect, setGameRedirect] = useState(false);
  const [numPlayers, setNumPlayers] = useState(0);
  const [gameMode, setGameMode] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
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

  function submitGameSettings(diff, name1, name2, size, gameCode) {
    setDifficulty(diff);

    if(name1 === null) {
      name1 = "Player"
    }

    if(name2 === null) {
      name2 = "AI"
    }

    props.setName1(name1);
    props.setName2(name2);
    setBoardSize(size);

    // for the API call, use gameMode variable stored in this component (1 = Connect 4, 2 = Don't Connect 4, 3 = Mayhem)
    // remember name2 is null here if in single player mode

    // use gameCode here for online mode
    console.log(gameCode)

    if(diff === null) {
      diff = 6
    }

    const base_url = 'http://127.0.0.1:5000/start?size='
    const url = base_url.concat(size, '&difficulty=', diff, '&p1=', name1, '&p2=', name2, '&mode=', gameMode)
    fetch(url, {method: 'put'})
    .then(response => response.json())
    .then(data => {
      props.setGameId(data['id'])
      console.log(data)
    })
    .catch(err => console.error(err))

    setGameRedirect(true);
  }

  function resetGameSettings() {
    setDifficulty(null);
    props.setName1(null);
    props.setName2(null);
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

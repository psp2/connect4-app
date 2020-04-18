import React, { useState } from "react";
import "../../pages/Menus/Menus.scss";

function GameSettings(props) {
  const [difficulty, setDifficulty] = useState(0);
  const [name, setName] = useState("");
  const [boardSize, setBoardSize] = useState(0);

  function resetSettings() {
    props.resetPlayers(0);
    props.resetGameMode(0);
  }

  function startGame() {
    props.submitSettings(difficulty, name, boardSize);
  }

  return (
    <div className="MenuBoard">
      <div className="MenuTitle">
        <div className="MenuTitleWhite">Game</div>
        <div className="MenuTitleRed">Settings</div>
      </div>
      <div className="MenuRow">
        <div className="WhiteButton">
          <div className="ButtonCaption">Difficulty</div>
        </div>
        <div className="RedButton">
          <div className="ButtonCaption">Board Size</div>
        </div>
      </div>
      <div className="MenuButtonRow">
        <div className="BackButtonYellow" onClick={resetSettings}>
          <div className="ButtonCaption">Go Back</div>
        </div>
        <div className="BackButtonGreen" onClick={startGame}>
          <div className="ButtonCaption">Start</div>
        </div>
      </div>
    </div>
  );
}

export default GameSettings;

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import "../../pages/Menus/Menus.scss";
import "./GameSettings.scss";

function GameSettings(props) {
  const [options] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [difficulty, setDifficulty] = useState(null);
  const [boardSize, setBoardSize] = useState(null);
  const [onlineMode, setOnlineMode] = useState(false);
  const [name1, setName1] = useState(null);
  const [name2, setName2] = useState(null);
  const [gameCode, setGameCode] = useState(null);

  function resetSettings() {
    props.resetPlayers(0);
    props.resetGameMode(0);
    props.resetSettings();
  }

  function startGame() {
    if (boardSize && (difficulty || name1)) {
      // If not in online mode, two names must be entered
      if (props.numPlayers === 2 && !onlineMode && !name2) {
        return;
      }
      props.submitSettings(difficulty, name1, name2, boardSize, gameCode);
    }
  }

  function selectDifficulty(diff) {
    setDifficulty(diff);
  }

  function selectName1(name) {
    setName1(name);
  }

  function selectName2(name) {
    setName2(name);
  }

  function selectSize(size) {
    setBoardSize(size);
  }

  function selectGameCode(code) {
    setGameCode(code);
  }

  function createDifficultyIcons(value) {
    if (value === difficulty) {
      return (
        <div className="SelectedValue" onClick={() => selectDifficulty(value)}>
          {value}
        </div>
      );
    } else {
      return (
        <div
          className="UnselectedValue"
          onClick={() => selectDifficulty(value)}
        >
          {value}
        </div>
      );
    }
  }

  function createSizeIcons(value) {
    if (value === boardSize) {
      return (
        <div className="SelectedValue" onClick={() => selectSize(value)}>
          {value}
        </div>
      );
    } else {
      return (
        <div className="UnselectedValue" onClick={() => selectSize(value)}>
          {value}
        </div>
      );
    }
  }

  return (
    <div className="MenuBoard">
      <div className="MenuTitle">
        <div className="MenuTitleWhite">Game</div>
        <div className="MenuTitleRed">Settings</div>
      </div>
      <div className="SettingsRow">
        {props.numPlayers === 1 && (
          <div className="DifficultySelect">
            <div className="SettingsHeading">
              <div className="ButtonCaption">Difficulty</div>
              <hr className="SettingsLine"></hr>
            </div>
            <div className="SettingsValueRow">
              {options.slice(0, 5).map((value) => createDifficultyIcons(value))}
            </div>
            <div className="SettingsValueRow">
              {options.slice(5, 9).map((value) => createDifficultyIcons(value))}
            </div>
          </div>
        )}
        {props.numPlayers !== 1 && (
          <div className="NameSelect">
            <div className="SettingsHeading">
              <div className="ButtonCaption">Enter Names</div>
              <hr className="SettingsLine"></hr>
            </div>
            {!onlineMode && (
              <div
                className="goOnlineButton"
                onClick={() => setOnlineMode(true)}
              >
                <div className="ButtonCaption">Switch to Online Mode</div>
              </div>
            )}
            {onlineMode && (
              <div
                className="goOfflineButton"
                onClick={() => setOnlineMode(false)}
              >
                <div className="ButtonCaption">Switch to Offline Mode</div>
              </div>
            )}
            <div className="nameZone">
              <FormControl
                className="nameInput"
                placeholder={"Player 1 Name"}
                defaultValue={""}
                onChange={(e) => selectName1(e.target.value)}
              />
              {!onlineMode && (
                <FormControl
                  className="nameInput"
                  placeholder={"Player 2 Name"}
                  defaultValue={""}
                  onChange={(e) => selectName2(e.target.value)}
                />
              )}
              {onlineMode && (
                <FormControl
                  className="nameInput"
                  placeholder={"Game Code"}
                  defaultValue={""}
                  onChange={(e) => selectGameCode(e.target.value)}
                />
              )}
            </div>
          </div>
        )}
        <div className="SizeSelect">
          <div className="SettingsHeading">
            <div className="ButtonCaption">Board Size</div>
            <hr className="SettingsLine"></hr>
          </div>
          <div className="SettingsValueRow">
            {options.slice(5, 8).map((value) => createSizeIcons(value))}
          </div>
        </div>
      </div>
      <div className="SettingsButtonRow">
        <div className="BackButtonYellow" onClick={resetSettings}>
          <div className="ButtonCaption">Back</div>
        </div>
        <div className="BackButtonGreen" onClick={startGame}>
          <div className="ButtonCaption">Start</div>
        </div>
      </div>
    </div>
  );
}

export default GameSettings;

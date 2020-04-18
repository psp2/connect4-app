import React from "react";
import "../../pages/Menus/Menus.scss";

function GameModes(props) {
  function selectGameMode(mode) {
    props.changeGameMode(mode);
  }

  return (
    <div className="MenuBoard">
      <div className="MenuTitle">
        <div className="MenuTitleWhite">Game</div>
        <div className="MenuTitleRed">Modes</div>
      </div>
      <div className="MenuRow">
        <div className="WhiteButton">
          <div className="ButtonCaption" onClick={() => selectGameMode(1)}>
            Connect 4
          </div>
        </div>
        {props.numPlayers === 1 && (
          <div className="YellowButton" onClick={() => selectGameMode(2)}>
            <div className="ButtonCaption">Don't Connect 4</div>
          </div>
        )}
        {props.numPlayers !== 1 && (
          <div className="GreenButton" onClick={() => selectGameMode(2)}>
            <div className="ButtonCaption">Don't Connect 4</div>
          </div>
        )}
        <div className="RedButton" onClick={() => selectGameMode(3)}>
          <div className="ButtonCaption">Mayhem</div>
        </div>
      </div>
      {props.numPlayers === 1 && (
        <div className="BackButtonYellow" onClick={() => props.resetPlayers(0)}>
          <div className="ButtonCaption">Go Back</div>
        </div>
      )}
      {props.numPlayers !== 1 && (
        <div className="BackButtonGreen" onClick={() => props.resetPlayers(0)}>
          <div className="ButtonCaption">Go Back</div>
        </div>
      )}
    </div>
  );
}

export default GameModes;

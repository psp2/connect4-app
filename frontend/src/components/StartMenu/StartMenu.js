import React from "react";
import "../../pages/Menus/Menus.scss";

function StartMenu(props) {
  function selectNumPlayers(num) {
    props.changeNumberPlayers(num);
  }

  return (
    <div className="MenuBoard">
      <div className="MenuTitle">
        <div className="MenuTitleWhite">Connect</div>
        <div className="MenuTitleRed">4</div>
      </div>
      <div className="MenuRow">
        <div className="WhiteButton">
          <div className="ButtonCaption">How to Play</div>
        </div>
        <div className="YellowButton" onClick={() => selectNumPlayers(1)}>
          <div className="ButtonCaption">Single Player</div>
        </div>
        <div className="GreenButton" onClick={() => selectNumPlayers(2)}>
          <div className="ButtonCaption">Multi-Player</div>
        </div>
        <div className="RedButton">
          <div className="ButtonCaption">About the Game</div>
        </div>
      </div>
    </div>
  );
}

export default StartMenu;

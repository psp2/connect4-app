import React, { useState } from "react";
import "../../pages/Menus/Menus.scss";

import MenuInfo from "../MenuInfo/MenuInfo";

function StartMenu(props) {
  const [infoDisplay, setInfoDisplay] = useState(null);

  function selectNumPlayers(num) {
    props.changeNumberPlayers(num);
  }

  function createInfoDisplay(displayType) {
    setInfoDisplay(displayType);
  }

  function removeInfoDisplay() {
    setInfoDisplay(null);
  }

  return (
    <div>
      <div className="MenuBoard">
        <div className="MenuTitle">
          <div className="MenuTitleWhite">Connect</div>
          <div className="MenuTitleRed">4</div>
        </div>
        <div className="MenuRow">
          <div
            className="WhiteButton"
            onClick={() => createInfoDisplay("tutorial")}
          >
            <div className="ButtonCaption">How to Play</div>
          </div>
          <div className="YellowButton" onClick={() => selectNumPlayers(1)}>
            <div className="ButtonCaption">Single Player</div>
          </div>
          <div className="GreenButton" onClick={() => selectNumPlayers(2)}>
            <div className="ButtonCaption">Multi-Player</div>
          </div>
          <div className="RedButton" onClick={() => createInfoDisplay("about")}>
            <div className="ButtonCaption">About the Game</div>
          </div>
        </div>
      </div>
      <div>
        {infoDisplay && (
          <MenuInfo
            displayType={infoDisplay}
            closeDisplay={removeInfoDisplay}
          />
        )}
      </div>
    </div>
  );
}

export default StartMenu;

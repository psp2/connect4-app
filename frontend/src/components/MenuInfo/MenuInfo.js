import React from "react";
import "./MenuInfo.scss";

function MenuInfo(props) {
  const tutorialText =
    "Here's how to play Connect 4 ... write more once implementation is complete!";
  const aboutGameText =
    "This Connect4 app and implementation was designed by Prashant Pokhriyal and Vivek Sriramineni (based on Python scripts written by Prashant Pokhriyal) for a UIUC CS242 class project.\n \n Connect Four belongs to Hasbro, Inc., and we do not aim to profit off of this game. \n\n With that being said, sit back and enjoy the game!";

  if (props.displayType === "tutorial") {
    return (
      <div className="Tutorial">
        <div className="TutorialText">{tutorialText}</div>
        <div className="CloseTutorial" onClick={props.closeDisplay}>
          <div className="ButtonCaption">Close</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="AboutGame">
        <div className="AboutGameText">{aboutGameText}</div>
        <div className="CloseAboutGame" onClick={props.closeDisplay}>
          <div className="ButtonCaption">Close</div>
        </div>
      </div>
    );
  }
}

export default MenuInfo;

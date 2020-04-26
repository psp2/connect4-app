import React from "react";
import "./MenuInfo.scss";

function MenuInfo(props) {
  const tutorialText =
    "This Connect 4 app is a logic-based game for all ages, playable either online or offline. There are 3 game modes: Connect4, Don't Connect 4, and Mayhem. For Connect 4, select a column to place your token in the lowest possible position for that column. Get 4 in a row, column, or diagonal line first to win! For Don't Connect 4, try to trick your opponent into getting 4 in a row first. For Mayhem, a random number between 1 and 1000 will be selected before each move. Your token will be placed as follows: (random_number % your column selection) + 1. Mayhem is a mix of math and luck, so have fun!";
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

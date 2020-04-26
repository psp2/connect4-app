import React from "react";
import "./Scoreboard.scss";

function Scoreboard(props) {
  // Temp until API, repeated games implemented

  return (
    <div className="Scoreboard">
      <div className="ScoreboardTitle">Scoreboard</div>
      <hr className="ScoreboardHRLine"></hr>
      <div className="ScoreboardTable">
        <div className="ScoreboardNameColumn">
          <div className="ScoreboardName">{props.player1Name}</div>
          <div className="ScoreboardName">{props.player2Name}</div>
        </div>
        <vr className="ScoreboardVRLine"></vr>
        <div className="ScoreboardNameColumn">
          <div className="ScoreboardCategories">W</div>
          <div className="ScoreboardName">{props.player1Wins}</div>
          <div className="ScoreboardName">{props.player2Wins}</div>
        </div>
        <div className="ScoreboardNameColumn">
          <div className="ScoreboardCategories">T</div>
          <div className="ScoreboardName">{props.player1Ties}</div>
          <div className="ScoreboardName">{props.player2Ties}</div>
        </div>
        <div className="ScoreboardNameColumn">
          <div className="ScoreboardCategories">L</div>
          <div className="ScoreboardName">{props.player1Losses}</div>
          <div className="ScoreboardName">{props.player2Losses}</div>
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;

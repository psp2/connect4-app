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
          <div className="ScoreboardName">{props.player1Score}</div>
          <div className="ScoreboardName">{props.player2Score}</div>
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;

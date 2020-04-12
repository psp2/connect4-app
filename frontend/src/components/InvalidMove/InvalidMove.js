import React from "react";
import { Button } from "react-bootstrap";
import "./InvalidMove.scss";

function InvalidMove(props) {
  function closeInvalidMessage() {
    props.invalidMessageReceived(true);
  }

  return (
    <div className="InvalidMove">
      <div className="InvalidMessage">Invalid Move</div>
      <Button onClick={closeInvalidMessage} className="InvalidMessageButton">
        Close
      </Button>
    </div>
  );
}

export default InvalidMove;

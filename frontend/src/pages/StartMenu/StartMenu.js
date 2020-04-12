import React, { useState } from "react";
import "./StartMenu.scss";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

function StartMenu() {
  const [gameRedirect, setGameRedirect] = useState(false);

  if (gameRedirect) {
    return <Redirect to="/game" />;
  }

  return (
    <div>
      This is the start menu (to be implemented in Week 2).
      <Button onClick={() => setGameRedirect(true)}>CLICK FOR GAME PAGE</Button>
    </div>
  );
}

export default compose(withRouter)(StartMenu);

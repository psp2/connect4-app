import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Game from "../Game/Game";
import GameOver from "../GameOver/GameOver";
import StartMenu from "../StartMenu/StartMenu";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"} component={StartMenu} />
          <Route exact path={"/game"} component={Game} />
          <Route path={"/gameover"} component={GameOver} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React, {useState} from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Game from "../Game/Game";
import GameOver from "../GameOver/GameOver";
import Menus from "../Menus/Menus";

function App() {
  const [gameId, setGameId] = useState("5ea1127db7d696391160dd22")
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"} render={() => <Menus setGameId={setGameId} gameId={gameId}/>} />
          <Route exact path={"/game"} render={() => <Game setGameId={setGameId} gameId={gameId}/>} />
          <Route path={"/gameover"} render={() => <GameOver/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

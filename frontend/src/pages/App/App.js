import React, {useState} from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Game from "../Game/Game";
import GameOver from "../GameOver/GameOver";
import Menus from "../Menus/Menus";

function App() {
  const [gameId, setGameId] = useState("5ea1127db7d696391160dd22");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"} render={() => <Menus setGameId={setGameId} gameId={gameId} setName1={setName1} setName2={setName2} />} />
          <Route exact path={"/game"} render={() => <Game setGameId={setGameId} gameId={gameId} name1={name1} name2={name2} setName1={setName1} setName2={setName2}/>} />
          <Route path={"/gameover"} render={() => <GameOver name1={name1} name2={name2} gameId={gameId}/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

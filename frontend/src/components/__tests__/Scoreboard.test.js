import React from "react";
import Scoreboard from "../Scoreboard/Scoreboard";
import renderer from "react-test-renderer";

it("Scoreboard1, renders correctly", () => {
  const player1Name = "Prashant";
  const player1Score = 3;
  const player2Name = "Vivek";
  const player2Score = 2;
  const tree = renderer
    .create(
      <Scoreboard
        player1Name={player1Name}
        player1Score={player1Score}
        player2Name={player2Name}
        player2Score={player2Score}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Scoreboard2, renders correctly", () => {
  const player1Name = "Vivek";
  const player1Score = 3;
  const player2Name = "Prashant";
  const player2Score = 2;
  const tree = renderer
    .create(
      <Scoreboard
        player1Name={player1Name}
        player1Score={player1Score}
        player2Name={player2Name}
        player2Score={player2Score}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Scoreboard, null values", () => {
  const player1Name = null;
  const player1Score = null;
  const player2Name = null;
  const player2Score = null;
  const tree = renderer
    .create(
      <Scoreboard
        player1Name={player1Name}
        player1Score={player1Score}
        player2Name={player2Name}
        player2Score={player2Score}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

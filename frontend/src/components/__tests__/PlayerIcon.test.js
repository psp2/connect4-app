import React from "react";
import PlayerIcon from "../PlayerIcon/PlayerIcon";
import renderer from "react-test-renderer";

it("playerIcon1, renders correctly", () => {
  const playerNumber = 1;
  const playerName = "Prashant";
  const tree = renderer
    .create(<PlayerIcon playerNumber={playerNumber} playerName={playerName} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("playerIcon2, renders correctly", () => {
  const playerNumber = 2;
  const playerName = "Vivek";
  const tree = renderer
    .create(<PlayerIcon playerNumber={playerNumber} playerName={playerName} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("playerIcon, null values", () => {
  const playerNumber = null;
  const playerName = null;
  const tree = renderer
    .create(<PlayerIcon playerNumber={playerNumber} playerName={playerName} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

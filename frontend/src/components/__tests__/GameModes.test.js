import React from "react";
import GameModes from "../GameModes/GameModes";
import renderer from "react-test-renderer";

it("GameModes, renders correctly", () => {
  const tree = renderer.create(<GameModes />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("GameModes, single player", () => {
  // should have yellow middle buttons
  const tree = renderer.create(<GameModes numPlayers={1} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("GameModes, multi player", () => {
  // should have green middle buttons
  const tree = renderer.create(<GameModes numPlayers={2} />).toJSON();
  expect(tree).toMatchSnapshot();
});

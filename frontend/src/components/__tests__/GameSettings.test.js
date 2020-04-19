import React from "react";
import GameSettings from "../GameSettings/GameSettings";
import renderer from "react-test-renderer";

it("GameSettings, renders correctly", () => {
  const tree = renderer.create(<GameSettings />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("GameSettings, Single Player", () => {
  // expect option for selecting difficulty to appear
  const tree = renderer.create(<GameSettings numPlayers={1} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("GameSettings, Multiplayer", () => {
  // expect option for entering names to appear
  const tree = renderer.create(<GameSettings numPlayers={2} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("GameSettings, null", () => {
  const tree = renderer.create(<GameSettings numPlayers={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});

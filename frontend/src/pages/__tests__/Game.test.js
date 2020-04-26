import React from "react";
import Game from "../Game/Game";
import renderer from "react-test-renderer";

it("game page, renders properly", () => {
  const state = jest.fn(() => {setGameState([1, []])});
  const tree = renderer
    .create(<Game/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

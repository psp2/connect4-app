import React from "react";
import GameOver from "../../pages/GameOver/GameOver";
import renderer from "react-test-renderer";

it("GameOver, renders correctly", () => {
  const tree = renderer.create(<GameOver />).toJSON();
  expect(tree).toMatchSnapshot();
});

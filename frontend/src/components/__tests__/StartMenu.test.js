import React from "react";
import StartMenu from "../StartMenu/StartMenu";
import renderer from "react-test-renderer";

it("Start Menu, renders correctly", () => {
  const tree = renderer.create(<StartMenu />).toJSON();
  expect(tree).toMatchSnapshot();
});

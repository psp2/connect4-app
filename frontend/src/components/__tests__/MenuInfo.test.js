import React from "react";
import MenuInfo from "../MenuInfo/MenuInfo";
import renderer from "react-test-renderer";

it("MenuInfo, renders correctly", () => {
  // By default, should show About the Game display
  const tree = renderer.create(<MenuInfo />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("MenuInfo, How to Play", () => {
  let displayType = "tutorial";
  const tree = renderer.create(<MenuInfo displayType={displayType} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("MenuInfo, null", () => {
  // By default, should show About the Game display
  const tree = renderer.create(<MenuInfo displayType={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});

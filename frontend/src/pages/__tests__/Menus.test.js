import React from "react";
import Menus from "../Menus/Menus";
import renderer from "react-test-renderer";

it("menus page, renders properly", () => {
  const tree = renderer
    .create(<Menus/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


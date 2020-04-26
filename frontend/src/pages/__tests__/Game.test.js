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


it("game page, takes normal names 1", () => {
  const state = jest.fn(() => {setGameState([1, []])});
  let name1 = "Prashant";
  let name2 = "Vivek";
  const tree = renderer
    .create(<Game name1={name1} name2={name2}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it("game page, takes normal names 2", () => {
  const state = jest.fn(() => {setGameState([1, []])});
  let name1 = "Angrave";
  let name2 = "Chancellor Jones";
  const tree = renderer
    .create(<Game name1={name1} name2={name2}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("game page, null names", () => {
  const state = jest.fn(() => {setGameState([1, []])});
  const tree = renderer
    .create(<Game name1={null} name2={null}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

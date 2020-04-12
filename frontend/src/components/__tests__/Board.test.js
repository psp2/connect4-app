import React from "react";
import Board from "../Board/Board";
import renderer from "react-test-renderer";

it("small board, renders correctly", () => {
  const player = 1;
  const gameState = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];
  const tree = renderer
    .create(<Board player={player} gameState={gameState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("medium board, renders correctly", () => {
  const player = 1;
  const gameState = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  const tree = renderer
    .create(<Board player={player} gameState={gameState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("large board, renders correctly", () => {
  const player = 1;
  const gameState = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const tree = renderer
    .create(<Board player={player} gameState={gameState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("null player", () => {
  const player = null;
  const gameState = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];
  const tree = renderer
    .create(<Board player={player} gameState={gameState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("null board", () => {
  const player = null;
  const gameState = null;
  const tree = renderer
    .create(<Board player={player} gameState={gameState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("empty board", () => {
  const player = null;
  const gameState = [];
  const tree = renderer
    .create(<Board player={player} gameState={gameState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("yellow board, renders correctly", () => {
  const player = 1;
  const gameState = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  const tree = renderer
    .create(<Board player={player} gameState={gameState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("red board, renders correctly", () => {
  const player = 1;
  const gameState = [
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
  ];
  const tree = renderer
    .create(<Board player={player} gameState={gameState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("too large board, renders incorrectly", () => {
  const player = 1;
  const gameState = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const tree = renderer
    .create(<Board player={player} gameState={gameState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("too small board, renders incorrectly", () => {
  const player = 1;
  const gameState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const tree = renderer
    .create(<Board player={player} gameState={gameState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

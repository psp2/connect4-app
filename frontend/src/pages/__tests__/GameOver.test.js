import React from "react";
import GameOver from "../GameOver/GameOver";
import renderer from "react-test-renderer";

it("game over page, renders with empty names", () => {
  let testJson = {leaderboard: [{'name': 'prashant', 'wins': 6, 'losses': 3, "ties": 4}, {'name': 'vivek', 'wins': 6, 'losses': 3, "ties": 4}]};
  // Currently, the names should be empty strings
  const tree = renderer
    .create(<GameOver testJson={testJson}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("game over page, renders properly", () => {
    let testJson = {leaderboard: [{'name': 'prashant', 'wins': 6, 'losses': 3, "ties": 4}, {'name': 'vivek', 'wins': 6, 'losses': 3, "ties": 4}]};
    let name1 = "Prashant";
    let name2 = "Vivek";
    const fetch = jest.fn(() => {});
    const tree = renderer
      .create(<GameOver name1={name1} name2={name2} testJson={testJson}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

it("game over page, null values", () => {
    let testJson = {leaderboard: [{'name': 'prashant', 'wins': 6, 'losses': 3, "ties": 4}, {'name': 'vivek', 'wins': 6, 'losses': 3, "ties": 4}]};
    const fetch = jest.fn(() => {true});
    const tree = renderer
        .create(<GameOver name1={null} name2={null} testJson={testJson}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

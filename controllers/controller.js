const { body, validationResult } = require("express-validator");
require("dotenv").config();
const db = require("../db/queries");
const timer = require("./timer");

const validateUser = [body("name").trim()];

function checkIfInTolerance(userCoordinate, correctCoordinate) {
  const selectionTolerance = 0.025;
  const scaleFactor = 10000;
  const min =
    Math.floor(
      correctCoordinate * scaleFactor - selectionTolerance * scaleFactor
    ) / scaleFactor;
  const max =
    Math.floor(
      correctCoordinate * scaleFactor + selectionTolerance * scaleFactor
    ) / scaleFactor;

  if (userCoordinate >= min && userCoordinate <= max) {
    return true;
  }
  return false;
}

const addUserScoreToGame = [
  validateUser,
  async (req, res) => {
    const name = req.body.name;
    const time = timer.calculateTimeDifference(req);
    const string = `${name} --- ${time} seconds`;
    const gameId = Number(req.params.gameId);

    const score = await db.addScoreToDatabase(name, time, string, gameId);

    return res.status(200).json(score);
  },
];

async function deleteUserScore(req, res) {
  const scoreId = Number(req.params.scoreId);
  const deletedScore = await db.deleteScoreFromDatabase(scoreId);
  return res.status(200).json(deletedScore);
}

async function checkCoordinates(req, res) {
  const x = req.body.x;
  const y = req.body.y;
  const id = Number(req.params.itemId);
  let goodHit = false;

  const correctCoordinates = await db.listCoordinates(id);
  const xGood = checkIfInTolerance(x, correctCoordinates.x);
  const yGood = checkIfInTolerance(y, correctCoordinates.y);
  if (xGood && yGood) {
    goodHit = true;
  }
  return res.status(200).json(goodHit);
}

async function listAllGames(req, res) {
  const allGames = await db.listAllGames();
  return res.status(200).json(allGames);
}

async function listGameItems(req, res) {
  const gameId = Number(req.params.gameId);
  const cleanedItemList = await db.listCleanedItems(gameId);
  res.status(200).json(cleanedItemList);
}

async function listSingleGameById(req, res) {
  const gameId = Number(req.params.gameId);
  const game = await db.listSingleGame(gameId);
  const token = await timer.sign();
  return res.status(200).json({ game, token });
}

async function listSingleGameScoresById(req, res) {
  const id = Number(req.params.gameId);
  const scores = await db.listSingleGameScores(id);

  return res.status(200).json(scores);
}

async function sendError(req, res) {
  return;
}

module.exports = {
  addUserScoreToGame,
  checkCoordinates,
  deleteUserScore,
  listAllGames,
  listGameItems,
  listSingleGameById,
  listSingleGameScoresById,
  sendError,
};

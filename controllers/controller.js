// const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const db = require("../db/queries");

const alphaErr = "must only contain letters";
const nameLengthErr = "must be between 1 and 10 characters";

const validateUser = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage(`First name alphaErr`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name nameLengthErr`),
];

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

async function addUserScoreToGame(req, res) {
  const name = req.body.name;
  const time = Number(req.body.time);
  const string = `${name} finished the challenge in ${time} seconds!`;
  const gameId = Number(req.params.gameId);

  const score = await db.addScoreToDatabase(name, time, string, gameId);

  return res.status(200).json(score);
}

async function deleteUserScore(req, res) {
  const scoreId = Number(req.params.scoreId);
  const deletedScore = await db.deleteScoreFromDatabase(scoreId);
  return res.status(200).json(deletedScore);
}

async function checkCoordinates(req, res) {
  const x = req.body.x;
  const y = req.body.y;
  const id = req.body.itemId;
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
  return res.status(200).json(game);
}

async function listSingleGameScoresById(req, res) {
  const id = Number(req.params.gameId);
  const scores = await db.listSingleGameScores(id);
  // console.log("scores from controller.listSingleGameScoresById():", scores);

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

// const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const alphaErr = "must only contain letters";
const nameLengthErr = "must be between 1 and 10 characters";
const emailErr = "must be a valid email";

const validateUser = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage(`First name alphaErr`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name nameLengthErr`),
];

async function addUserScoreToGame(req, res) {
  console.log("add user score to the game");
  return res.status(200);
}

async function checkCoordinates(req, res) {
  console.log("check coordinates");
  return res.status(200);
}

async function listAllGames(req, res) {
  console.log("return list of all games");
  return res.status(200);
}

async function listSingleGameById(req, res) {
  console.log("list single game by id");
  return res.status(200);
}

async function listSingleGameScoresById(req, res) {
  console.log("list scores");
  return res.status(200);
}

async function sendError(req, res) {
  console.log("error");
  return res.status(400);
}

module.exports = {
  addUserScoreToGame,
  checkCoordinates,
  listAllGames,
  listSingleGameById,
  listSingleGameScoresById,
  sendError,
};

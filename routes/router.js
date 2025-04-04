const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

router.get("/", controller.listAllGames);
// this will also return a jwt which will be used to get the user's play time
router.get("/:gameId", controller.listSingleGameById);
router.get("/:gameId/scores", controller.listSingleGameScoresById);
router.post("/:gameId/scores", controller.addUserScoreToGame);

router.post("/items/:itemId/check", controller.checkCoordinates);

router.use("*", controller.sendError);

module.exports = router;

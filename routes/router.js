const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

router.get("/", controller.getAllGames);
// this will also return a jwt which will be used to get the user's play time
router.get("/:gameId", controller.getSingleGame);

router.get("/scores/:gameId", controller.getGameScores);
router.post("/scores/:gameId", controller.postGameScores);

router.post("/hit/:itemId", controller.postCoordinatesForChecking);

router.use("*", controller.errorGet);

module.exports = router;

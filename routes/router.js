const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

router.get("/", controller.listAllGames);
router.get("/game/:gameId", controller.listSingleGameById); // this will also return a jwt which will be used to get the user's play time

router.get("/game/:gameId/scores", controller.listSingleGameScoresById);
router.post("/game/:gameId/scores", controller.addUserScoreToGame);
router.delete("/scores/:scoreId", controller.deleteUserScore);

router.get("/game/:gameId/items", controller.listGameItems);

router.post("/items/:itemId/check", controller.checkCoordinates);

router.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = router;

const router = require("../routes/router");

const request = require("supertest");
const express = require("express");
const app = express();
require("dotenv");

app.use(express.urlencoded({ extended: false }));
app.use("/", router);

const allGames = [
  {
    id: 1,
    name: "AD 2222",
    src: "images/1/main.jpg",
    credit: "https://www.reddit.com/user/Chekavo/",
  },
];

const singleGame = {
  id: 1,
  name: "AD 2222",
  src: "images/1/main.jpg",
  credit: "https://www.reddit.com/user/Chekavo/",
};

const allItems = [
  {
    id: 1,
    name: "Kenny",
    src: "images/1/kenny.jpg",
    x: 0.5955734406438632,
    y: 0.453344120819849,
    gameId: 1,
  },
  {
    id: 2,
    name: "Spiderman",
    src: "images/1/spiderman.jpg",
    x: 0.6453722334004024,
    y: 0.843042071197411,
    gameId: 1,
  },
  {
    id: 3,
    name: "Stewie",
    src: "images/1/stewie.jpg",
    x: 0.9446680080482898,
    y: 0.48220064724919093,
    gameId: 1,
  },
  {
    id: 4,
    name: "John Wick",
    src: "images/1/john_wick.jpg",
    x: 0.5321931589537223,
    y: 0.3988673139158576,
    gameId: 1,
  },
  {
    id: 5,
    name: "Link",
    src: "images/1/link.jpg",
    x: 0.23038229376257546,
    y: 0.9004854368932039,
    gameId: 1,
  },
];

const sanitizedItems = [];

(() => {
  for (let i = 0; i < allItems.length; i++) {
    const oldItem = allItems[i];
    const { x, y, ...newItem } = oldItem;
    sanitizedItems.push(newItem);
  }
})();

const testScores = [
  {
    name: "Name",
    time: 1,
    string: "Name finished the challenge in 1 seconds!",
    gameId: 1,
  },
];

test("list all games route works", (done) => {
  request(app)
    .get("/")
    .expect("Content-Type", /json/)
    .expect(allGames)
    .expect(200, done);
});

test("list single game route works", (done) => {
  request(app)
    .get("/game/1")
    .expect("Content-Type", /json/)
    .expect(singleGame)
    .expect(200, done);
});

test("posting new score works", (done) => {
  request(app)
    .post("/game/1/scores")
    .type("form")
    .send(testScores[0])
    .then((postRes) => {
      const newScoreId = Number(postRes.body.id);
      const newSingleScore = { ...testScores[0], id: newScoreId };

      return request(app)
        .get("/game/1/scores")
        .expect((res) => {
          const newestScore = res.body[res.body.length - 1];
          expect(newestScore).toMatchObject(newSingleScore);
        });
    })
    .then(() => {
      done();
    })
    .catch((error) => {
      done(error);
    });
});

test("deleting scores works", (done) => {
  request(app)
    .get("/game/1/scores")
    .then((res) => {
      const scores = res.body;

      const deleteRequests = scores.map((score) =>
        request(app).delete(`/scores/${score.id}`)
      );

      return Promise.all(deleteRequests)
        .then(() => {
          request(app).get("/game/1/scores").expect(200).expect([], done);
        })
        .catch((error) => {
          done(error);
        });
    });
});

test("listing sanitized items for a game works", (done) => {
  request(app)
    .get("/game/1/items")
    .expect("Content-Type", /json/)
    .expect(sanitizedItems)
    .expect(200, done);
});

test("coordinate check with correct hit works", (done) => {
  request(app)
    .post(`/items/${allItems[0].id}/check`)
    .type("form")
    .send(allItems[0])
    .expect("Content-Type", /json/)
    .expect("true")
    .expect(200, done);
});

test("coordinate check with wrong hit fails", (done) => {
  request(app)
    .post(`/items/${allItems[0].id}/check`)
    .type("form")
    .send({ x: 0.1, y: 0.1 })
    .expect("Content-Type", /json/)
    .expect("false")
    .expect(200, done);
});

test("wrong url sends 404", (done) => {
  request(app).get("/nonExistentRoute").expect(404, done);
});

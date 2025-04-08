import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const databaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.NODE_ENV === "development"
      ? process.env.DEV_DATABASE_URL
      : process.env.PROD_DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
}).$extends(withAccelerate());

async function addGameToDatabase(name: string, src: string, credit: string) {
  try {
    if (!name || !src || !credit) {
      return null;
    }
    const game = await prisma.game.create({
      data: {
        name,
        src,
        credit,
      },
    });
    return game;
  } catch (error) {
    console.error(error);
  }
}

async function listCoordinates(id: number) {
  const item = await prisma.item.findFirst({
    where: { id },
  });
  if (item) {
    const coordinates = {
      x: item.x,
      y: item.y,
    };
    return coordinates;
  }
  return null;
}

async function listGameId(name: string) {
  const game = await prisma.game.findFirst({
    where: { name },
  });
  if (game) {
    const gameId = game.id;
    return gameId;
  }
  return null;
}

async function addItemToDatabase(
  name: string,
  src: string,
  x: number,
  y: number,
  gameName: string
) {
  try {
    if (!name || !src || !x || !y || !gameName) {
      return null;
    }
    const gameId = await listGameId(gameName);
    if (gameId) {
      await prisma.item.create({
        data: {
          name,
          src,
          x,
          y,
          gameId,
        },
      });
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}

async function addScoreToDatabase(
  name: string,
  time: number,
  string: string,
  gameId: number
) {
  try {
    if (!name || isNaN(time) || !string || !gameId) {
      return null;
    }
    const score = await prisma.score.create({
      data: {
        name,
        time,
        string,
        gameId,
      },
    });
    return score;
  } catch (error) {
    console.error(error);
  }
}

async function deleteScoreFromDatabase(id: number) {
  try {
    const deletedScore = await prisma.score.delete({
      where: { id },
    });
    return deletedScore;
  } catch (error) {
    console.error(error);
  }
}

async function verifyInitialGameExists() {
  try {
    const gameCount = await prisma.game.count();
    if (gameCount === 0) {
      await addGameToDatabase(
        "AD 2222",
        "images/1/main.jpg",
        "https://www.reddit.com/user/Chekavo/"
      );
    }
    const newCount = await prisma.game.count();
    if (newCount > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
}

async function listAllGames() {
  const gameDatabaseGoodToGo = await verifyInitialGameExists();
  if (gameDatabaseGoodToGo) {
    const allGames = await prisma.game.findMany({});
    return allGames;
  }
}

async function verifyInitialItemsExist() {
  const gameId = await listGameId("AD 2222");
  const itemCount = await prisma.item.count();
  if (itemCount === 0 && gameId) {
    await prisma.item.createMany({
      data: [
        {
          id: 1,
          name: "Kenny",
          src: "images/1/kenny.jpg",
          x: 0.5955734406438632,
          y: 0.453344120819849,
          gameId,
        },
        {
          id: 2,
          name: "Spiderman",
          src: "images/1/spiderman.jpg",
          x: 0.6453722334004024,
          y: 0.843042071197411,
          gameId,
        },
        {
          id: 3,
          name: "Stewie",
          src: "images/1/stewie.jpg",
          x: 0.9446680080482898,
          y: 0.48220064724919093,
          gameId,
        },
        {
          id: 4,
          name: "John Wick",
          src: "images/1/john_wick.jpg",
          x: 0.5321931589537223,
          y: 0.3988673139158576,
          gameId,
        },
        {
          id: 5,
          name: "Link",
          src: "images/1/link.jpg",
          x: 0.23038229376257546,
          y: 0.9004854368932039,
          gameId,
        },
      ],
    });
  }
  const newCount = await prisma.item.count();
  if (newCount > 0) {
    return true;
  }
  return false;
}

async function listCleanedItems(gameId: number) {
  await verifyInitialItemsExist();
  const cleanedItems = await prisma.item.findMany({
    where: { gameId },
    omit: { x: true, y: true },
  });
  return cleanedItems;
}

async function listSingleGame(id: number) {
  const game = await prisma.game.findFirst({
    where: { id },
  });
  return game;
}

async function listSingleGameScores(gameId: number) {
  try {
    const score = await prisma.score.findMany({
      where: { gameId },
    });
    return score;
  } catch (error) {
    console.error(error);
  }
}

export {
  addGameToDatabase,
  addItemToDatabase,
  addScoreToDatabase,
  deleteScoreFromDatabase,
  listAllGames,
  listCleanedItems,
  listCoordinates,
  listSingleGame,
  listSingleGameScores,
};

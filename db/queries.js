"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGameToDatabase = addGameToDatabase;
exports.addItemToDatabase = addItemToDatabase;
exports.addScoreToDatabase = addScoreToDatabase;
exports.deleteScoreFromDatabase = deleteScoreFromDatabase;
exports.listAllGames = listAllGames;
exports.listCleanedItems = listCleanedItems;
exports.listCoordinates = listCoordinates;
exports.listSingleGame = listSingleGame;
exports.listSingleGameScores = listSingleGameScores;
const client_1 = require("@prisma/client");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
require("dotenv");
const databaseUrl = process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.NODE_ENV === "development"
        ? process.env.DEV_DATABASE_URL
        : process.env.PROD_DATABASE_URL;
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
}).$extends((0, extension_accelerate_1.withAccelerate)());
function addGameToDatabase(name, src, credit) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!name || !src || !credit) {
                return null;
            }
            const game = yield prisma.game.create({
                data: {
                    name,
                    src,
                    credit,
                },
            });
            return game;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function listCoordinates(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield prisma.item.findFirst({
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
    });
}
function listGameId(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const game = yield prisma.game.findFirst({
            where: { name },
        });
        if (game) {
            const gameId = game.id;
            return gameId;
        }
        return null;
    });
}
function addItemToDatabase(name, src, x, y, gameName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!name || !src || !x || !y || !gameName) {
                return null;
            }
            const gameId = yield listGameId(gameName);
            if (gameId) {
                yield prisma.item.create({
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
        }
        catch (error) {
            console.error(error);
        }
    });
}
function addScoreToDatabase(name, time, string, gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!name || isNaN(time) || !string || !gameId) {
                return null;
            }
            const score = yield prisma.score.create({
                data: {
                    name,
                    time,
                    string,
                    gameId,
                },
            });
            return score;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function deleteScoreFromDatabase(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedScore = yield prisma.score.delete({
                where: { id },
            });
            return deletedScore;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function verifyInitialGameExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gameCount = yield prisma.game.count();
            if (gameCount === 0) {
                yield addGameToDatabase("AD 2222", "images/1/main.jpg", "https://www.reddit.com/user/Chekavo/");
            }
            const newCount = yield prisma.game.count();
            if (newCount > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function listAllGames() {
    return __awaiter(this, void 0, void 0, function* () {
        const gameDatabaseGoodToGo = yield verifyInitialGameExists();
        if (gameDatabaseGoodToGo) {
            const allGames = yield prisma.game.findMany({});
            return allGames;
        }
    });
}
function verifyInitialItemsExist() {
    return __awaiter(this, void 0, void 0, function* () {
        const gameId = yield listGameId("AD 2222");
        const itemCount = yield prisma.item.count();
        if (itemCount === 0 && gameId) {
            yield prisma.item.createMany({
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
        const newCount = yield prisma.item.count();
        if (newCount > 0) {
            return true;
        }
        return false;
    });
}
function listCleanedItems(gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield verifyInitialItemsExist();
        const cleanedItems = yield prisma.item.findMany({
            where: { gameId },
            omit: { x: true, y: true },
        });
        return cleanedItems;
    });
}
function listSingleGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const game = yield prisma.game.findFirst({
            where: { id },
        });
        return game;
    });
}
function listSingleGameScores(gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const score = yield prisma.score.findMany({
                where: { gameId },
                orderBy: {
                    time: "asc",
                },
            });
            return score;
        }
        catch (error) {
            console.error(error);
        }
    });
}

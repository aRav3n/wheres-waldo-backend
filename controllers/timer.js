const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function extractTokenFromReq(req) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[bearer.length - 1];
    return token;
  }
  return null;
}

function calculateTimeDifference(req) {
  try {
    const token = extractTokenFromReq(req);
    const decodedToken = jwt.decode(token);
    const iat = decodedToken.iat;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const secondsElapsed = currentTimestamp - iat;
    return secondsElapsed;
  } catch (error) {
    console.error(error);
  }
}

async function sign() {
  return new Promise((resolve, reject) => {
    jwt.sign({}, secretKey, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

module.exports = { calculateTimeDifference, sign };

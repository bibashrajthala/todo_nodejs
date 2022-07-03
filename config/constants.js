require("dotenv").config();

let saltRounds;
if (process.env.SALT_ROUNDS) {
  saltRounds = parseInt(process.env.SALT_ROUNDS); // convert saltround from string to int
}

module.exports = {
  saltRound: saltRounds,
  tokenSecret: process.env.TOKEN_SECRET || "secret",
};

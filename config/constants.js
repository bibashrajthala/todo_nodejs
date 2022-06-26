require("dotenv").config();

let saltRounds;
if (process.env.SALT_ROUNDS) {
  saltRounds = parseInt(process.env.SALT_ROUNDS);
}

module.exports = {
  saltRound: saltRounds,
};

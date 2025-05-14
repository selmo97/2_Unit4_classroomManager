const jwt = require("jsonwebtoken");
const { getUserByToken } = require("./helpers");



const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    req.user = await getUserByToken(token);
    next();
  } catch (ex) {
    res.status(401).send("You must be logged in to do that.");
  }
};

module.exports = isLoggedIn;


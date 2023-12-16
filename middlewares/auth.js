const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../api/users/users.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }

    const decoded = jwt.verify(token, config.secretJwtToken);
    const user = await User.findById(decoded._id);

    if (!user) {
      throw "user not found";
    }

    req.user = user; // Ajout de toutes les informations de l'utilisateur à 'req'
    next();
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};


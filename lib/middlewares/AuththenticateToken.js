const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../configs/Config.js');
const { apibase } = require('../configs/Apibase.js');

const auththenticateToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = user.id;
    next();
  });
};

module.exports = auththenticateToken;
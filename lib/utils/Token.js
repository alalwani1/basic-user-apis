const jwt = require('jsonwebtoken');
const { accessTokenExpireTime, accessTokenSecret } = require('../configs/Config.js');

// creates jwt Access token
const generateToken = async (id) => {
  return jwt.sign({ id }, accessTokenSecret, {
  	expiresIn: accessTokenExpireTime
  });
};

module.exports = generateToken;
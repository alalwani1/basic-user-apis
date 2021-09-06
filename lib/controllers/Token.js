const { findToken } = require('../models/RefreshToken.js');
const generateToken = require('../utils/Token.js');
const { refreshTokenSecret } = require('../configs/Config.js');
const jwt = require('jsonwebtoken');

const generateAccessToken = async(req, res) => {
	let refreshToken = req.body.token;
	if (refreshToken == null){
		return res.status(401).json({message: 'Refresh Token got expired.'});
	}
	else if (await findToken(refreshToken)) {
		console.log(refreshTokenSecret)
		jwt.verify(refreshToken, refreshTokenSecret, async (error, userId) => {
	    	if (error) {
	    		return res.status(403).json({message: 'Invalid Refresh Token.'});
	    	}
	    	let accessToken = await generateToken(userId);
	    	res.json({ ok: true,
	    		      accessToken: accessToken });
	  	});
	}
	else {
		return res.status(403).json({message: 'Invalid Refresh Token.'});
	}
};

module.exports = generateAccessToken;
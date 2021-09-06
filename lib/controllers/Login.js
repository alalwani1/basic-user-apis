const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { refreshTokenSecret, refreshTokenExpireTime } = require('../configs/Config.js');
const errorHandler = require('../handlers/Error.js');
const generateToken = require('../utils/Token.js');
const { addToken } = require('../models/RefreshToken.js');

//getLogin api will render Login page
const getLogin = async (req, res) => {
	res.status(200).send({
		ok: true,
		message: 'Currently you are in login page'
	});
	//render if any page is available
	//res.render('login');
};


//postlogin api will help user to login into webpage
const postLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const accessToken = await generateToken(user._id);
  		const refreshToken = jwt.sign({userId: user.id}, refreshTokenSecret, {expiresIn: refreshTokenExpireTime});
  		addToken(refreshToken);
		//setting jwt-token in cookie
		//res.cookie('jwt', token, { httpOnly: true, maxAge: accessTokenExpireTime});
		//ideally we should set jwt-token in cookie
		res.status(200).json({ 
			ok: true,
			user: user._id,
			accessToken: accessToken, 
			refreshToken: refreshToken ,
			message: 'you have successfully logged in'
		});
	}
	catch(error){
		const errors = await errorHandler(error);
		if(errors.email == 'email-id is not registered'){
			return res.status(404).send({ message: errors.email });
		}
		else if(errors.password == 'password is incorrect'){
			return res.status(401).send({
          				accessToken: null,
          				message: errors.password
        			});
		}
	}
};

module.exports = {
	getLogin,
	postLogin
};

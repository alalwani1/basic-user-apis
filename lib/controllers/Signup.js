const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { maxAge } = require('../configs/Config.js');
const errorHandler = require('../handlers/Error.js');
const generateToken = require('../utils/Token.js');

//getSignup api will render Signup page
const getSignup = async (req, res) => {
	res.status(200).send({
		ok: true,
		message: 'Currently you are in signup page'
	});
	//render if any page is available
	//res.render('login');
};

//postSignup api will help user to register or signup
const postSignup = async (req, res) => {
	const { firstName, lastName, password, email, contact, address, gender } = req.body;
	try {
		const user = await User.create({ firstName, lastName, password, email, contact, address, gender });
		console.log('h1')
		const token = await generateToken(user._id);
		console.log('h2')
		//res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge});
		res.status(201).json({ 
			ok: true,
			user: user._id, 
			message: "User was registered successfully!"
		});
		console.log('h3')
	}
	catch(error){
		const errors = await errorHandler(error);
		res.status(400).send({ errors })
	}
};

module.exports = {
	getSignup,
	postSignup
};

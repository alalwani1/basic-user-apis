let config = {
	dbURI: //'mongodb+srv://<username>:<password>@cluster0.h8hkl.mongodb.net/myFirstDatabase', //process.env.DB_URI,
	accessTokenSecret: 'Assignment', //process.env.ACCESS_TOKEN_SECRET,
	commandPort: 5000, //process.env.COMMAND_PORT,
	port: 80,
	nodeEnv: 'dev', //process.env.NODE_ENV
	accessTokenExpireTime: '15m',
	refreshTokenExpireTime: 3 * 60 * 60 * 1000,
	refreshTokenSecret: 'Interview'//process.env.REFRESH_TOKEN_SECRET;
}
module.exports = config;

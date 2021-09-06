const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const config = require('./lib/configs/Config.js');
const { apibase } = require('./lib/configs/Apibase.js');
const { loginRouter, logoutRouter, signupRouter, searchRouter, tokenRouter } = require('./lib/routes/index.js');

const app = express();
const commandPort = config.nodeEnv === 'production' ? (config.port || 80) : (config.commandPort || 5000);

app.set('port', commandPort);
//middlewares
app.use(express.json());
//app.use(cookieParser());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// if db connection made successfully then only router will listen on any port
mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("Successfully connect to MongoDB.");
		//app.listen(commandPort, () => {
  		//	console.log(`Server is running on port ${commandPort}.`);
		//});
	})
	.catch((error) => {
		console.error("Connection error", err);
    	process.exit();
	});

// home page or default route
app.get(`${apibase}/`, (req, res) => {
	res.status(200).json({
		ok: true,
		message: 'you are in home page'
	});
}).listen(process.env.PORT || 5000);
//adding all routes

app.use(loginRouter, logoutRouter, signupRouter, searchRouter, tokenRouter);
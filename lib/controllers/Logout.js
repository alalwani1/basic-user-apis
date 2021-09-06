const { apibase } = require('../configs/Apibase.js');
const { revokeToken } = require('../models/RefreshToken.js');

//getLogout function wll logout user from website
const getLogout =  async (req, res) => {
  //res.cookie('jwt', '', { maxAge: 1 });
  await revokeToken(req.body.token);
  res.status(200).json({
		ok: true,
		message: 'you are successfully logout'
	});
  //res.redirect(`${apibase}/`);
}

module.exports = getLogout;

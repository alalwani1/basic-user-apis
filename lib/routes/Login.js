const express = require('express');
const { apibase } = require('../configs/Apibase.js');
const { getLogin, postLogin } = require('../controllers/Login.js');
const { changeHeaders } = require('../middlewares');

const loginRouter = new express.Router();

loginRouter.get(`${apibase}/login`, getLogin);
loginRouter.post(`${apibase}/authenticate`, changeHeaders,  postLogin);

module.exports = loginRouter;
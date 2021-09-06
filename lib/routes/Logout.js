const express = require('express');
const { apibase } = require('../configs/Apibase.js');
const getLogout = require('../controllers/Logout.js');

const logoutRouter = new express.Router();

logoutRouter.get(`${apibase}/logout`, getLogout);

module.exports = logoutRouter;
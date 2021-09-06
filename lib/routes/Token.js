const express = require('express');
const { apibase } = require('../configs/Apibase.js');
const generateAccessToken = require('../controllers/Token.js');
const { changeHeaders } = require('../middlewares');

const tokenRouter = new express.Router();

tokenRouter.post(`${apibase}/auth/token`, changeHeaders, generateAccessToken); 

module.exports = tokenRouter;
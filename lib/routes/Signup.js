const express = require('express');
const { apibase } = require('../configs/Apibase.js');
const { getSignup, postSignup }= require('../controllers/Signup.js');
const { changeHeaders } = require('../middlewares');

const signupRouter = new express.Router();

signupRouter.get(`${apibase}/signup`, getSignup);
signupRouter.post(`${apibase}/auth/signup`, changeHeaders, postSignup);

module.exports = signupRouter;
const express = require('express');
const { apibase } = require('../configs/Apibase.js');
const { searchUserByName, searchUserByContact } = require('../controllers/Search.js');
const { changeHeaders, auththenticateToken } = require('../middlewares');

const searchRouter = new express.Router();

searchRouter.get(`${apibase}/searchUserByName`, changeHeaders, auththenticateToken, searchUserByName); 
searchRouter.get(`${apibase}/searchUserByContact`, changeHeaders, auththenticateToken, searchUserByContact);

module.exports = searchRouter;
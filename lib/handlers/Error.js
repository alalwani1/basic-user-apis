const User = require("../models/User.js");
const jwt = require('jsonwebtoken');

// helps to provides correct error messages in json format
const errorHandler = async (err) => {
  
  let errors = {};

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'email-id is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'email-id is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = errorHandler;
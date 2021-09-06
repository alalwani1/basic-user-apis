const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const regexPatternMatch = require('../utils/Regex.js');

//user schema with validations
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please enter first name'],
		minLength: [2, 'Minimum first name length is 2'],
		trim: true
	},
	lastName: {
		type: String,
		required: [true, 'Please enter last name'],
		minLength: [2, 'Minimum last name length is 2'],
		trim: true
	},
	password: {
		type: String, 
		required: [true, 'Please enter a password'],
		minLength: [8, 'Minimum password length is 8'],
		maxlength: [16, 'Maximum password length is 16'],
		trim: true
	},
	email: {
		type: String,
		lowercase: true,
		required: [true, 'Please enter an email'],
		validate: [isEmail, 'Please enter a valid email'],
		trim: true,
		unique: true,
	},
	contact: {
	    type: String,
	    validate: {
	            validator: function(v) {
	                return /[0-9]{9}/.test(v);
	            },
	            message: '{VALUE} is not a valid 10 digit contact number!'
	        }
    },
	address: {
		street: {
			type: String,
			required: [true, 'Please enter street'],
			minLength: [2, 'Minimum city name length is 2'],
			trim: true
		},
		city: {
			type: String,
			required: [true, 'Please enter city name'],
			minLength: [2, 'Minimum city name length is 2'],
			trim: true
		},
		state: {
			type: String,
			required: [true, 'Please enter state name'],
			minLength: [2, 'Minimum state name length is 2'],

			trim: true
		},
		country: {
			type: String,
			required: [true, 'Please enter country name'],
			minLength: [3, 'Minimum country name length is 3'],
			trim: true
		},
		zip: {
			type: String,
			validate: {
	            validator: function(v) {
	                return /[0-9]{6}/.test(v);
	            },
	            message: '{VALUE} is not a valid 6 digit zip-code number!'
	        },
			trim: true
		}
	},
	gender: {
		type: String,
		lowercase: true,
		enum: {
            values: ['male', 'female', 'other'],
            message: "Enter enter gender from any one of these: ['male', 'female', 'other']"
        },
	    trim: true
    }
});

//hook triggers before saving user doc to db
userSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// login check
userSchema.statics.login = async function(email, password) {
	let user = await this.findOne({ email });
	if(user){
		let auth = await bcrypt.compare(password, user.password);
		if(auth){
			return user;
		}
		throw Error('incorrect password');
	}
	throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;


const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

//user schema
const userSchemaIdeal = new mongoose.Schema({
	username: { 	
		type: String, 
		required:[true, "Can't be blank"], 
		lowercase: true, 
		unique: true, 
		index: true,
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
		index: true
	},
	profile: {
		firstName: {
			type: String,
			required: [true, 'Please enter first name'],
			trim: true
		},
		lastName: {
			type: String,
			required: [true, 'Please enter last name'],
			trim: true
		},
		contact: {
	        type: Number,
	        validate: {
	            validator: function(v) {
	                return /d{10}/.test(v);
	            },
	            message: '{VALUE} is not a valid 10 digit number!'
	        }
    	},
		address: {
			street: {
				type: String,
				required: [true, 'Please enter street'],
				trim: true
			},
			city: {
				type: String,
				required: [true, 'Please enter city name'],
				trim: true
			},
			state: {
				type: String,
				required: [true, 'Please enter state name'],
				trim: true
			},
			country: {
				type: String,
				required: [true, 'Please enter country name'],
				trim: true
			},
			zip: {
				type: String,
				required: [true, 'Please enter zip code'],
				trim: true
			}

		},
		gender: {
	        type: String,
	        trim: true
      	}
	}
});

//triggers before saving user doc to db
userSchemaIdeal.pre('save', async (next) => {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchemaIdeal.statics.login =async function(email, password) {
	const user = await this.findOne({ email });
	if(user){
		const auth = await bcrypt.compare(password, user.password);
		if(auth){
			return user;
		}
		throw Error('incorrect password');
	}
	throw Error('incorrect email');
};

const UserIdeal = mongoose.model('user', userSchemaIdeal);

module.exports = UserIdeal;


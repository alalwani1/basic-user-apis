const User = require('../models/User.js');
const regexPattern = require('../utils/Regex.js');

//check string is empty or not
function isEmpty(str) {
    return (str.length === 0 || !str.trim());
}

//check contact contains all numeric numbers or not
function isNumeric(contact) {
  return /^-?\d+$/.test(contact);
}

//searchUserByName api will help user to find other users either by firstname or lastname
//this api will give results in list as more than one user can be present with same firstName or lastName
const searchUserByName = async (req, res) => {
	let { firstName, lastName } = req.query;
	console.log(firstName, lastName)
	//if both firstName and lastName are empty
	if(isEmpty(firstName) && isEmpty(lastName)){
		res.status(400).json({ 
			ok: true,
			message: 'Please provide any one of firstName or lastName'
		});
		return;
	}
	else {
		let searchFirstNameRgx = await regexPattern(firstName);
  		let searchLastNameRgx = await regexPattern(lastName);
  		// search begins with firstName or lastName where they can either be partials
		User.find({
		    	$and: [
		      		{firstName : {$regex : searchFirstNameRgx}},
		      		{lastName : {$regex : searchLastNameRgx}}
		    	]
		  	}, function(error, users) {
				if (error) {
		          res.status(500).send({ message: error });
		          return;
		        }
				//if at least one user found
				if(users.length>0){
					res.status(200).json({ 
						ok: true,
						list: users
					});
				}
				//if no user found
				else{
					res.status(200).json({ 
						ok: true,
						message: 'no user found',
					});
				}
			}
		);
	}
};

//searchUserByContact api will help user to find other users by contact
//this api will give results in list as more than one user can be present with same contact digits(if contact.length<10)
const searchUserByContact = async (req, res) => {
	const { contact } = req.query;
	console.log(contact);
	//check contact number is null or not
	if(isEmpty(contact)){
		res.status(400).json({ 
			ok: true,
			message: 'Please provide contact number for search'
		});
		return;
	}
	//check contact number contains alphabets or not
	else if(!isNumeric(contact)){
		res.status(400).json({ 
			ok: true,
			message: 'Please provide contact number in digits or in Number formatf for search'
		});
		return;
	}
	else {
	  	let searchContactRgx = await regexPattern(contact);
	  	//Partial contact Search Begins
	  	User.find({contact : {$regex : searchContactRgx}}, function(error, users) {
			//if at least one user found
			if (error) {
		    	res.status(500).send({ message: error });
		        return;
		    }
			if(users.length !== 0){
				res.status(200).json({ 
					ok: true,
					list: users
				});
			}
			//if no user found
			else{
				res.status(200).json({ 
					ok: true,
					message: 'no user found',
				});
			}
		});
		
		
	}
};

module.exports = {
	searchUserByName,
	searchUserByContact
};

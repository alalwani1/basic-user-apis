# Basic user Authentication APIs with JWT
This package provides Basic User authentication related Rest APIs. Example:

## Types of Rest APIs covered:

## GET Requests: 
1. Home Page(render html page if any)
2. Signup Form(render html page if any)
3. Login Form(render html page if any) 
4. Search other User either by firstname or lastname
5. get logout from webpage
6. search other user by contact number.(for UI related part sorry, that is not included in this project as this small project was highly focused for to provide Rest API's only).

## POST Requests: 
1. Post Login Form Data 
2. Post Signup Form Data 
3. Generate access token with the help of refresh token after expires.

## Authentication
Json web token(JWT) is used for secure authentication.

## Database 
MongoDB cloud

## Project Deployment Platform
Heroku(as i am very familiar with heroku)

## User Model
The Signup form stores data inside MongoDB 'User' collection through 'User' Schema(./lib/models/User.js). Connetion string with MongoDB is created with the help of moongose.

## How to use Rest APIs
you can use below three Rest APIs for to fetch UI pages:
## 1. Home Page            
Rest API: http://localhost:3000/api/v1.0/
## 2. Signup form          
Rest API: http://localhost:3000/api/v1.0/signup
## 3. Login Form           
Rest API: http://localhost:3000/api/v1.0/login

you just simply need to mention your html page inside redirect method mentioned inside above Rest APIs.

## 4. Post Signup Form Data(needed for the first time activity of every user): In this API, you need to fill all the user related details inside body.
 	Rest APIs: http://localhost:5000/api/v1.0/auth/signup
	json template:
		{
		    "firstName": "Naman",
		    "lastName": "Sharma",
		    "password": "gtecvhn", 
		    "email": "namansharma@gmail.com", 
		    "contact": 7123456890,
		    "address": {
			    "street": "198-A Atulya Apartments",
			    "city": "Indore",
			    "state": "Madhya Pradesh", 
			    "country": "India",
			    "zip": 312032
		    }, 
		    "gender": "male"
		}

## What checks Mongoose User schema performs on above given json body for signup form data?
	
	firstName: It is mandatory field with minimum length 2.
	lastName: It is also mandatory field with minimum length 2.
	password: It is also mandatory field with minimum length 8 and maximum length 16.
	email: this is also mandatory field and this field would be verifed with isEmail validator.
	contact: this field would contains 10 digit numbers only.
	street, city, state: these are mandatory fields with at least length 2.
	country; this field should have at least 3 characters.
	zip: this field should have exact should contains 6 digit number.
	gender: value should match from any one of these[male, female, other].
	
	other: same emailid is used in second signup?

	Note: In each entry of user or in each signup, email id should be unique. you can change above provided checks according to your need.

	output:
		{
		    "ok": true,
		    "user": "6135cd3c4e0077f00f7cad",
		    "message": "User was registered successfully!"
		}

## 5. Post Login Form Data: 
       This Rest API post login form data and authenticate user:
	Rest APIs: http://localhost:5000/api/v1.0/authenticate

	json body:
		{
		    "email": "namansharma@gmail.com",
		    "password": "gtecvhn"
		}

	o/p:
		{
		    "ok": true,
		    "user": "6135cd3c4e0077f00f7cad",
		    "accessToken": "eyJhbGciOiJIUzI1NiIsR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzVjZDNjNGUwYzUwNzdmMDBmN2NhZCIsImlhdCI6MTYzMDkxNTkxMiwiZXhwIjoxNjMwOTE2ODEyfQ.4K_g4eFU5PA7biDQUq_V2XNyFqe1hgPXPXSGmm522sU",
		    "refreshToken": "eyJhbGciOiJIUzI1NiIsIncCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTM1Y2QzYzRlMGM1MDc3ZjAwZjdjYWQiLCJpYXQiOjE2MzA5MTU5MTIsImV4cCI6MTY0MTcxNTkxMn0.wxv172-I_4wXey-StA0oIReWhUKH5N7VERvknjkMEBk",
		    "message": "you have successfully logged in"
		}

	accessToken is created along with the refresh Token where access token has expiry time of 15 minutes and refreshToken has expiry time of 3 hr.

## how user can do safe browsing(safe from hackers) with the help of jwt tokens? or how we can make our jwt safe?
	In the above output, access token and refresh token are received through login api and both are jwt tokens. In order to do safe browsing from hacker we need shorttime expiration technique for access token. Now user will make every next request along with access token. In between requesting data from server, if hacker hacks user's jwt(access token) then that access token will be expire in shorttime(15 min) and invalidate. Now it would be not that much easy for hacker to hack access token again and again in each 15 minutes.

## now How user will be able to get new access token after expires of last access token? or Why do we need access token along with refresh token? 
	once user's access token expires then user can make request to server with the below given Rest API:
## 6.	Refresh access token
         Rest API: http://localhost:5000/api/v1.0/auth/token  along with refresh token inside body.

	As we know refresh token has expire time of 3 hr(can be more by making changes in config file) then from that refresh token, server will get to know about the user has valid refresh token or not. if user has valid refresh token then server will create new access token otherwise user has to again login for to get both access token and refresh token.

## 7. Search other User either by firstname or lastname with access token in headers:

	Rest API: http://localhost:3000/api/v1.0/searchUserByName?firstName=Naman&lastName=Sharma

	Here we need to provide firstName or lastName in params. These values can be partials values for search 
	examples:
		a) firstName: na from naman and lastName: ""
		b) firstName: "" and lastName: sha from sharma
		c) firstName: na from naman and lastName: sha from sharma

## 8. Search other User contact number with access token in headers:
	Rest API: http://localhost:3000/api/v1.0/searchUserByContact?contact=7123456890

	here we need to provide contact number in params. We can also search contact number as partial values like:
		a) 34 from 7123456890
		b) 71 from 7123456890


## 9. get logout from webpage:
	Rest API: http://localhost:3000/api/v1.0/logout
	user needs to send refersh token along with above Rest API for to make invalidate refresh token after successful logout.


## Note: you can run this project locally by replacing dbURI(inside ./lib/configs/Config.js) along with your dbURI. this dbURI you get when you give database access to user in MongoDB cloud.













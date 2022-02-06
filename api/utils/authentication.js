const jwt = require('jsonwebtoken');
const Logger = require('./logger');
const Errors = require('./errors');

const logger = new Logger('authentication');

const auth = (id) => {
	return jwt.sign({id}, process.env.JWTTOKEN, {
		expiresIn: '72h'
	});
};

const getToken = (req) => {
	if(!req.headers || !req.headers.authorization)
		return false;
	const token = req.headers.authorization;
	return token;
};

const getUserByToken = (token) => {
	try {
		let decoded = jwt.verify(token, process.env.JWTTOKEN);
		return decoded.id;
	} catch(err) {
		logger.error('getUserByToken', err);
		throw Errors.AuthenticationErrors.FAILED_TO_GET_USER;
	}
};

const getUser = (req) => {
	const token = getToken(req);
	if(token)
		return getUserByToken(token);
	else
		return false;
};

const isValid = (req) => {
	try{
		const token = getToken(req);
		if(token){
			const id = getUserByToken(token);
			return (id!=='');
		}
		else
			return false;
	} catch(err) {
		logger.error('isValid', err);
		throw Errors.AuthenticationErrors.FAILED_TO_VALIDATE_USER;
	}
};

module.exports = {
	auth,
	getUser,
	isValid
};
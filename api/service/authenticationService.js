const Auth = require('../utils/authentication');
const User = require('../controller/userController');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('authenticationService');

const checkAdmin = async (req, res, next) => {
	try {
		const id = Auth.getUser(req);
		if(!id) {
			res.status(400).send({message: Errors.AuthenticationErrors.INVALID_TOKEN.message});
			return;
		}
		logger.debug('checkAdmin', `user id: ${id}`);
		const user = await User.getById(id);
		if(!user.admin){
			res.status(400).send({message: Errors.AuthenticationErrors.USER_NOT_ADMIN.message});
			return;
		}
		next();
	} catch (err) {
		logger.error('checkAdmin', err);
		res.status(400).send({message: err.message});
	}
};

const checkUser = async (req, res, next) => {
	try{
		const id = Auth.getUser(req);
		if(!id) {
			res.status(400).send({message: Errors.AuthenticationErrors.INVALID_TOKEN.message});
			return;
		}
		req.params.userId = id;
		next();
	} catch (err) {
		logger.error('checkUser', err);
		res.status(400).send({message: err.message});
	}
};

const getUser = async (req, _, next) => {
	try {
		const id = Auth.getUser(req);
		if(id) {
			req.params.userId = id;
		}
		next();
	} catch (err) {
		logger.error('getUser', err);
	}
};

module.exports = {
	checkAdmin,
	checkUser,
	getUser
};
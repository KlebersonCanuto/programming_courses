module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('User', {
		username: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true
			}
		},
		email: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true
			}
		},
		password: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true
			}
		},
		emailConfirmed: Sequelize.BOOLEAN,
		profileImageURL: {
			type: Sequelize.STRING,
			defaultValue: ''
		},
		admin: Sequelize.BOOLEAN
	});

	return User;
};
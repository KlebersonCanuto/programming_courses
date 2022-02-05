module.exports = (sequelize, Sequelize) => {
	const ProblemUser = sequelize.define('ProblemUser', {
		done: Sequelize.BOOLEAN,
		oracle: Sequelize.BOOLEAN,
		attempts: Sequelize.INTEGER,
		UserId: {
			type: Sequelize.INTEGER,
			field: 'user_id'
		},
		ProblemId: {
			type: Sequelize.INTEGER,
			field: 'problem_id'
		}
	});

	return ProblemUser;
};
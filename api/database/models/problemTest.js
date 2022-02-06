module.exports = (sequelize, Sequelize) => {
	const Test = sequelize.define('Test', {
		input: Sequelize.STRING,
		output: Sequelize.STRING,
		example: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
		ProblemId: {
			type: Sequelize.INTEGER,
			field: 'problem_id',
			allowNull: false,
		}
	});

	return Test;
};
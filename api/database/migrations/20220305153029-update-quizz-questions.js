module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn(
			'Quizzes',
			'choice',
			{
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false
			}
		);

		await queryInterface.addColumn(
			'Quizzes',
			'options',
			{
				allowNull: true,
				type: Sequelize.STRING
			}
		);
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn(
			'Quizzes',
			'choice'
		);

		await queryInterface.removeColumn(
			'Quizzes',
			'options'
		);
	}
};

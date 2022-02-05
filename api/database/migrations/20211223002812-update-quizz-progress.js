module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn(
			'QuizUsers',
			'hint',
			{
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false
			}
		);
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn(
			'QuizUsers',
			'hint'
		);
	}
};

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn(
			'Materials',
			'content',
			{
				allowNull: false,
				type: Sequelize.TEXT,
				defaultValue: ''
			}
		);

		await queryInterface.changeColumn(
			'Problems',
			'description',
			{
				allowNull: false,
				type: Sequelize.TEXT,
				defaultValue: ''
			}
		);

		await queryInterface.changeColumn(
			'Quizzes',
			'question',
			{
				allowNull: false,
				type: Sequelize.TEXT,
				defaultValue: ''
			}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn(
			'Materials',
			'content',
			{
				allowNull: false,
				type: Sequelize.STRING,
				defaultValue: ''
			}
		);

		await queryInterface.changeColumn(
			'Problems',
			'description',
			{
				allowNull: false,
				type: Sequelize.STRING,
				defaultValue: ''
			}
		);

		await queryInterface.changeColumn(
			'Quizzes',
			'question',
			{
				allowNull: false,
				type: Sequelize.STRING,
				defaultValue: ''
			}
		);
	}
};
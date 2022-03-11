module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn(
			'Tests',
			'input',
			{
				allowNull: false,
				type: Sequelize.TEXT,
				defaultValue: ''
			}
		);

		await queryInterface.changeColumn(
			'Tests',
			'output',
			{
				allowNull: false,
				type: Sequelize.TEXT,
				defaultValue: ''
			}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn(
			'Tests',
			'input',
			{
				allowNull: false,
				type: Sequelize.STRING,
				defaultValue: ''
			}
		);

		await queryInterface.changeColumn(
			'Tests',
			'output',
			{
				allowNull: false,
				type: Sequelize.STRING,
				defaultValue: ''
			}
		);
	}
};
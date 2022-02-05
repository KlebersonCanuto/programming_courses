module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Quizzes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING
			},
			question: {
				allowNull: false,
				type: Sequelize.STRING
			},
			hint: {
				allowNull: true,
				type: Sequelize.STRING
			},
			number: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			answers: {
				allowNull: true,
				type: Sequelize.STRING
			},
			module_id: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'Modules',
					key: 'id',
					as: 'module',
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			}
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable('Quizzes');
	}
};

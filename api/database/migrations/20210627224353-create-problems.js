module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Problems', {
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
			description: {
				allowNull: false,
				type: Sequelize.STRING
			},
			file_id: {
				allowNull: false,
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
		await queryInterface.dropTable('Problems');
	}
};

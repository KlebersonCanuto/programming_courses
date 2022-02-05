module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Modules', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			number: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			course_id: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'Courses',
					key: 'id',
					as: 'course',
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
		await queryInterface.dropTable('Modules');
	}
};

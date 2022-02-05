module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('CourseUsers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'Users',
					key: 'id',
					as: 'user',
				}
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
			conclude: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			conclusion: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
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
		await queryInterface.dropTable('CourseUsers');
	}
};

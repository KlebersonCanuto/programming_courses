module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Progresses', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
      user: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user',
        }
      },
      course: {
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
				defaultValue: Sequelize.NOW
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			}
		});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Progresses');
  }
};

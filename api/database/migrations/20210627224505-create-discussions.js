module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Discussions', {
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
			topic: {
				allowNull: false,
				type: Sequelize.STRING,
			},
      updated: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
        defaultValue: false
			},
      creator_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Users',
          key: 'id',
          as: 'creator',
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
    await queryInterface.dropTable('Discussions');
  }
};

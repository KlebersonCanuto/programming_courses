module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tests', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			input: {
				allowNull: false,
				type: Sequelize.STRING
			},
			output: {
				allowNull: false,
				type: Sequelize.STRING
			},
      example: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      problem: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Problems',
          key: 'id',
          as: 'problem',
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
    await queryInterface.dropTable('Tests');
  }
};

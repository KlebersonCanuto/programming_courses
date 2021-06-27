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
      module: {
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
    await queryInterface.dropTable('Problems');
  }
};

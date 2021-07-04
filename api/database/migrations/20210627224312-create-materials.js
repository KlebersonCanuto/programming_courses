module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Materials', {
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
      content: {
				allowNull: false,
				type: Sequelize.STRING
			},
			number: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
      complementary: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
        defaultValue: false
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Materials');
  }
};

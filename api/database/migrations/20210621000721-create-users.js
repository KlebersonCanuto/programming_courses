module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
				notEmpty: true,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			emailConfirmed: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			profileImageURL: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			admin: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false
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
    await queryInterface.dropTable('Users');
  }
};

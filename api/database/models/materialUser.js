module.exports = (sequelize, Sequelize) => {
	const MaterialUser = sequelize.define('MaterialUser', {
		done: Sequelize.BOOLEAN,
		UserId: {
			type: Sequelize.INTEGER,
			field: 'user_id',
			allowNull: false,
		},
		MaterialId: {
			type: Sequelize.INTEGER,
			field: 'material_id',
			allowNull: false,
		}
	});

	return MaterialUser;
};
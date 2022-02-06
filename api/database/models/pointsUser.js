module.exports = (sequelize, Sequelize) => {
	const PointsUser = sequelize.define('PointsUser', {
		points: Sequelize.INTEGER,
		UserId: {
			type: Sequelize.INTEGER,
			field: 'user_id',
			allowNull: false,
		}
	});

	PointsUser.associate = (models) => {
		PointsUser.hasOne(models.User, { sourceKey: 'UserId', as: 'user', foreignKey: 'id' });
	};

	return PointsUser;
};
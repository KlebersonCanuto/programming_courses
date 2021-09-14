module.exports = (sequelize, Sequelize) => {
  const PointsUser = sequelize.define('PointsUser', {
    points: Sequelize.INTEGER,
    UserId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    }
  });

  return PointsUser;
}
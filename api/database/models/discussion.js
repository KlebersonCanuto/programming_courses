module.exports = (sequelize, Sequelize) => {
  const Discussion = sequelize.define('Discussion', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    topic: Sequelize.STRING,
    updated: Sequelize.BOOLEAN
  });

  Discussion.associate = (models) => {
    Discussion.hasOne(models.User, { foreignKey: "user_id", as: 'user' });
    Discussion.hasMany(models.Comment, { foreignKey: "discussion_id", as: 'comments' });
  }

  return Discussion;
};
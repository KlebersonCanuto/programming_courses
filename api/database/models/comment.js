module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('Comment', {
    description: Sequelize.STRING,
    updated: Sequelize.BOOLEAN
  });

  Comment.associate = (models) => {
    Comment.hasOne(models.User, { foreignKey: "user_id", as: 'user' });
  }

  return Comment;
};
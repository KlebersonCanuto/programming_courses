module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('Comment', {
    description: Sequelize.STRING,
    updated: Sequelize.BOOLEAN,
    discussion_id: Sequelize.INTEGER
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Discussion, { foreignKey: 'discussion_id' });
    Comment.hasOne(models.User, { as: 'user' });
  }

  return Comment;
};
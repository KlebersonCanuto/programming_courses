module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('Comment', {
    description: Sequelize.STRING,
    updated: Sequelize.BOOLEAN,
    DiscussionId: {
      type: Sequelize.INTEGER,
      field: "discussion_id"
    }
  });

  Comment.associate = (models) => {
    Comment.hasOne(models.User, { as: 'user' });
  }

  return Comment;
};
module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('Comment', {
    description: Sequelize.STRING,
    updated: Sequelize.BOOLEAN,
    DiscussionId: {
      type: Sequelize.INTEGER,
      field: "discussion_id"
    }
  });

  return Comment;
};
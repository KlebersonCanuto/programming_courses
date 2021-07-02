module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('Comment', {
    description: Sequelize.STRING,
    updated: Sequelize.BOOLEAN
  });

  return Comment;
};
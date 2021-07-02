module.exports = (sequelize, Sequelize) => {
  const Answer = sequelize.define('Answer', {
    answer: Sequelize.STRING
  });

  return Answer;
};
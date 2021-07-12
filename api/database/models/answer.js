module.exports = (sequelize, Sequelize) => {
  const Answer = sequelize.define('Answer', {
    answer: Sequelize.STRING,
    QuizId: {
      type: Sequelize.INTEGER,
      field: "quiz_id"
    }
  });

  return Answer;
};
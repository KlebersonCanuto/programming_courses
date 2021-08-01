module.exports = (sequelize, Sequelize) => {
  const Answer = sequelize.define('Answer', {
    answer: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    QuizId: {
      type: Sequelize.INTEGER,
      field: "quiz_id"
    }
  });

  return Answer;
};
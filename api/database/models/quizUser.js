module.exports = (sequelize, Sequelize) => {
  const QuizUser = sequelize.define('QuizUser', {
    done: Sequelize.BOOLEAN,
    attempts: Sequelize.INTEGER,
    UserId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    },
    QuizId: {
      type: Sequelize.INTEGER,
      field: 'quiz_id'
    }
  });

  return QuizUser;
}
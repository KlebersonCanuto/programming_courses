module.exports = (sequelize, Sequelize) => {
  const ProblemUser = sequelize.define('ProblemUser', {
    done: Sequelize.BOOLEAN,
    oracle: Sequelize.BOOLEAN,
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

  return ProblemUser;
}
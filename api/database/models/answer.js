module.exports = (sequelize, Sequelize) => {
  const Answer = sequelize.define('Answer', {
    answer: Sequelize.STRING,
    quiz_id: Sequelize.INTEGER
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Quiz, { foreignKey: 'quiz_id' });
  }

  return Answer;
};
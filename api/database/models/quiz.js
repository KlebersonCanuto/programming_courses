module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define('Quiz', {
    title: Sequelize.STRING,
    question: Sequelize.STRING,
    hint: Sequelize.STRING,
    number: Sequelize.INTEGER
  });

  Quiz.associate = (models) => {
    Quiz.hasMany(models.Answer, { foreignKey: "quiz_id", as: 'answers' });
  }

  return Quiz;
};
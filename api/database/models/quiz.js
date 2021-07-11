module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define('Quiz', {
    title: Sequelize.STRING,
    question: Sequelize.STRING,
    hint: Sequelize.STRING,
    number: Sequelize.INTEGER,
    module_id: Sequelize.INTEGER
  });

  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Module, { foreignKey: 'module_id' });
    Quiz.hasMany(models.Answer, { as: 'answers' });
  }

  return Quiz;
};
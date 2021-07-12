module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define('Quiz', {
    title: Sequelize.STRING,
    question: Sequelize.STRING,
    hint: Sequelize.STRING,
    number: Sequelize.INTEGER,
    ModuleId: {
      type: Sequelize.INTEGER,
      field: "module_id"
    }
  });

  Quiz.associate = (models) => {
    Quiz.hasMany(models.Answer, { as: 'answers' });
  }

  return Quiz;
};
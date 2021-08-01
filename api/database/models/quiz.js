module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define('Quiz', {
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    question: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
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
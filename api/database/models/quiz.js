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
      },
    },
    hint: Sequelize.STRING,
    number: Sequelize.INTEGER,
    answers: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      },
      get() {
          return this.getDataValue('answers').split('====');
      },
      set(val) {
         this.setDataValue('answers',val.join('===='));
      },
    },
    ModuleId: {
      type: Sequelize.INTEGER,
      field: 'module_id'
    },
    done: {
      type: Sequelize.VIRTUAL
    }
  });

  return Quiz;
};
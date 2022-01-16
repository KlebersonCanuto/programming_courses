module.exports = (sequelize, Sequelize) => {
  const Module = sequelize.define('Module', {
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    number: Sequelize.INTEGER,
    CourseId: {
      type: Sequelize.INTEGER,
      field: 'course_id'
    },
    done: {
      type: Sequelize.VIRTUAL
    },
    doneMaterials: {
      type: Sequelize.VIRTUAL
    },
    doneQuizzes: {
      type: Sequelize.VIRTUAL
    },
    doneProblems: {
      type: Sequelize.VIRTUAL
    },
    locked: {
      type: Sequelize.VIRTUAL
    },
  });

  Module.associate = (models) => {
    Module.hasMany(models.Material, { as: 'materials' });
    Module.hasMany(models.Quiz, { as: 'quizzes' });
    Module.hasMany(models.Problem, { as: 'problems' });
  }

  return Module;
};
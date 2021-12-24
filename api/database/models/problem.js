module.exports = (sequelize, Sequelize) => {
  const Problem = sequelize.define('Problem', {
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    file_id: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    ModuleId: {
      type: Sequelize.INTEGER,
      field: 'module_id'
    },
    done: {
      type: Sequelize.VIRTUAL
    },
    locked: {
      type: Sequelize.VIRTUAL
    },
  });

  Problem.associate = (models) => {
    Problem.hasMany(models.Test, { as: 'tests' });
  }

  return Problem;
};
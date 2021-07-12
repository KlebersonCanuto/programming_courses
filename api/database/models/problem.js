module.exports = (sequelize, Sequelize) => {
  const Problem = sequelize.define('Problem', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    ModuleId: {
      type: Sequelize.INTEGER,
      field: "module_id"
    }
  });

  Problem.associate = (models) => {
    Problem.hasMany(models.Test, { as: 'tests' });
  }

  return Problem;
};
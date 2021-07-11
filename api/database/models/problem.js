module.exports = (sequelize, Sequelize) => {
  const Problem = sequelize.define('Problem', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    module_id: Sequelize.INTEGER
  });

  Problem.associate = (models) => {
    Problem.hasMany(models.Test, { as: 'tests' });
    Problem.belongsTo(models.Module, { foreignKey: 'module_id' });
  }

  return Problem;
};
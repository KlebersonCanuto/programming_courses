module.exports = (sequelize, Sequelize) => {
  const Problem = sequelize.define('Problem', {
    title: Sequelize.STRING,
    description: Sequelize.STRING
  });


  Problem.associate = (models) => {
    Problem.hasMany(models.Test, { foreignKey: "id", as: 'tests' });
  }

  return Problem;
};
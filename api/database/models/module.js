module.exports = (sequelize, Sequelize) => {
  const Module = sequelize.define('Module', {
    name: Sequelize.STRING,
    number: Sequelize.INTEGER
  });

  return Module;
};
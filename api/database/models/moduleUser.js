module.exports = (sequelize, Sequelize) => {
	const ModuleUser = sequelize.define('ModuleUser', {
		concludeMaterials: Sequelize.BOOLEAN,
		concludeQuizzes: Sequelize.BOOLEAN,
		concludeProblems: Sequelize.BOOLEAN,
		conclusionMaterials: Sequelize.INTEGER,
		conclusionQuizzes: Sequelize.INTEGER,
		conclusionProblems: Sequelize.INTEGER,
		UserId: {
			type: Sequelize.INTEGER,
			field: 'user_id',
			allowNull: false,
		},
		ModuleId: {
			type: Sequelize.INTEGER,
			field: 'module_id',
			allowNull: false,
		}
	});

	return ModuleUser;
};
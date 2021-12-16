module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MaterialUsers', {
      id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user',
        }
      },
      material_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Materials',
          key: 'id',
          as: 'material',
        }
      },
      done: {
        allowNull: false,
				type: Sequelize.BOOLEAN,
        defaultValue: false
      },
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			}
		});

    await queryInterface.createTable('QuizUsers', {
      id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user',
        }
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Quizzes',
          key: 'id',
          as: 'quiz',
        }
      },
      attempts: {
        allowNull: false,
				type: Sequelize.INTEGER,
        defaultValue: 0
      },
      done: {
        allowNull: false,
				type: Sequelize.BOOLEAN,
        defaultValue: false
      },
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			}
		});

    await queryInterface.createTable('ProblemUsers', {
      id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user',
        }
      },
      problem_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Problems',
          key: 'id',
          as: 'problem',
        }
      },
      attempts: {
        allowNull: false,
				type: Sequelize.INTEGER,
        defaultValue: 0
      },
      done: {
        allowNull: false,
				type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      oracle: {
        allowNull: false,
				type: Sequelize.BOOLEAN,
        defaultValue: false
      },
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			}
		});

    await queryInterface.createTable('ModuleUsers', {
      id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user',
        }
      },
      module_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Modules',
          key: 'id',
          as: 'module',
        }
      },
      concludeMaterials: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      concludeQuizzes: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      concludeProblems: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      conclusionMaterials: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      conclusionQuizzes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      conclusionProblems: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			}
		});

    await queryInterface.createTable('PointsUsers', {
      id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
      user_id: {
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user',
        }
      },
      points: {
				allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			}
		});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MaterialUsers');
    await queryInterface.dropTable('QuizUsers');
    await queryInterface.dropTable('ProblemUsers');
    await queryInterface.dropTable('ModuleUsers');
    await queryInterface.dropTable('PointsUsers');
  }
};

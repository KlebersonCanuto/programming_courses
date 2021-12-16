const { MaterialUser, PointsUser, ProblemUser, QuizUser, ModuleUser, CourseUser, Sequelize } = require('../database/models');
const Quiz = require('./quizController');
const Problem = require('./problemController');
const Material = require('./materialController');
const Module = require('./moduleController');

const addPoints = async (UserId, points) => {
  try {
    const pointsUser = await PointsUser.findOne({ where: { UserId } });
    if (!pointsUser) {
      await PointsUser.create({
        UserId,
        points
      });
    } else {
      await PointsUser.update({
        points: Sequelize.literal(`points + ${points}`)
      }, { where: { id: pointsUser.id }})
    }
    return;
  } catch (err) {
    throw 400;
  }
}

const checkCourseComplete = async (UserId, CourseId) => {
  try {
    const courseUser = await CourseUser.findOne({ 
      where: { UserId, CourseId },
      attributes: ['id', 'conclusion', 'CourseId', 'UserId']
    });
    const modules = await Module.getByCourse(CourseId);
    const total = modules.length;

    let id;
    let conclude = false;
    let conclusion = false;
    if (!courseUser) {
      conclusion = 1;
      conclude = total === conclusion;
      const mu = await CourseUser.create({CourseId, UserId, conclusion, conclude});
      id = mu.id;
    } else {
      id = courseUser.id;
      conclusion = courseUser.conclusion + 1;
      conclude = total === conclusion;
      await CourseUser.update({CourseId, UserId, conclusion, conclude}, {where: {id}});
    }

    if (conclude) {
      await addPoints(UserId, 10);
    }
  } catch (err) {
    throw 400;
  }
}

const checkModuleComplete = async (id) => {
  try {
    const moduleUser = await ModuleUser.findByPk(id, {
      attributes: ['conclusionMaterials', 'concludeMaterials', 'ModuleId', 'UserId',
      'conclusionQuizzes', 'concludeQuizzes', 'conclusionProblems', 'concludeProblems']
    });
    const UserId = moduleUser.UserId;
    const module = await Module.getById(moduleUser.ModuleId);
    const CourseId = module.CourseId;
    if (moduleUser.conclusionMaterials === module.materials.filter(e => !e.complementary).length &&
    moduleUser.conclusionQuizzes === module.quizzes.length && moduleUser.conclusionProblems === module.problems.length) {
      await ModuleUser.update({concludeProblems: true, concludeMaterials: true, concludeQuizzes: true}, {where: {id}});
      await checkCourseComplete(UserId, CourseId);
      await addPoints(UserId, 3);
    }
  } catch (err) {
    throw 400;
  }
}

const materialModuleProgress = async (ModuleId, UserId) => {
  try {
    const materials = await Material.getNotComplementary(ModuleId);
    const moduleUser = await ModuleUser.findOne({ 
      where: { ModuleId, UserId },
      attributes: ['conclusionMaterials', 'id']
    });
    const total = materials.length;
    let id;
    let concludeMaterials = false;
    let conclusionMaterials = false;
    if (!moduleUser) {
      conclusionMaterials = 1;
      concludeMaterials = total === conclusionMaterials;
      const mu = await ModuleUser.create({ModuleId, UserId, conclusionMaterials, concludeMaterials});
      id = mu.id;
    } else {
      id = moduleUser.id;
      conclusionMaterials = moduleUser.conclusionMaterials + 1;
      concludeMaterials = total === conclusionMaterials;
      await ModuleUser.update({ModuleId, UserId, conclusionMaterials, concludeMaterials}, {where: {id}});
    }
    
    if (concludeMaterials) {
      await checkModuleComplete(id);
      await addPoints(UserId, 1);
    }
  } catch (err) {
    throw 400;
  }
}

const quizModuleProgress = async (QuizId, UserId) => {
  try {
    const quiz = await Quiz.getById(QuizId);
    const ModuleId = quiz.ModuleId;
    const quizzes = await Quiz.getByModule(ModuleId);
    const moduleUser = await ModuleUser.findOne({ 
      where: { ModuleId, UserId },
      attributes: ['conclusionQuizzes', 'id']
    });
    const total = quizzes.length;
    let id;
    let concludeQuizzes = false;
    let conclusionQuizzes = false;
    if (!moduleUser) {
      conclusionQuizzes = 1;
      concludeQuizzes = total === conclusionQuizzes;
      const mu = await ModuleUser.create({ModuleId, UserId, conclusionQuizzes, concludeQuizzes});
      id = mu.id;
    } else {
      id = moduleUser.id;
      conclusionQuizzes = moduleUser.conclusionQuizzes + 1;
      concludeQuizzes = total === conclusionQuizzes;
      await ModuleUser.update({ModuleId, UserId, conclusionQuizzes, concludeQuizzes}, {where: {id}});
    }
    
    if (concludeQuizzes) {
      await checkModuleComplete(id);
      await addPoints(UserId, 2);
    }
  } catch (err) {
    throw 400;
  }
}

const problemModuleProgress = async (ProblemId, UserId) => {
  try {
    const problem = await Problem.getById(ProblemId);
    const ModuleId = problem.ModuleId;
    const problems = await Problem.getByModule(ModuleId);
    const moduleUser = await ModuleUser.findOne({ 
      where: { ModuleId, UserId },
      attributes: ['conclusionProblems', 'id']
    });
    const total = problems.length;
    let id;
    let concludeProblems = false;
    let conclusionProblems = false;
    if (!moduleUser) {
      conclusionProblems = 1;
      concludeProblems = total === conclusionProblems;
      const mu = await ModuleUser.create({ModuleId, UserId, conclusionProblems, concludeProblems});
      id = mu.id;
    } else {
      id = moduleUser.id;
      conclusionProblems = moduleUser.conclusionProblems + 1;
      concludeProblems = total === conclusionProblems;
      await ModuleUser.update({ModuleId, UserId, conclusionProblems, concludeProblems}, {where: {id}});
    }
    
    if (concludeProblems) {
      await checkModuleComplete(id);
      await addPoints(UserId, 2);
    }
  } catch (err) {
    throw 400;
  }
}

const getPoints = async (UserId) => {
  try {
    const pointsUser = await PointsUser.findOne({ 
      where: { UserId },
      attributes: ['points']
    });
    if (!pointsUser) {
      return 0;
    }
    return pointsUser.points;
  } catch (err) {
    throw 400;
  }
}

const getMaterial = async (MaterialId, UserId) => {
  try {
    const materialUser = await MaterialUser.findOne({ 
      where: { UserId, MaterialId },
      attributes: ['done']
    });  
    return materialUser;
  } catch (err) {
    throw 400;
  }
}

const saveMaterial = async (UserId, material) => {
  try {
    await MaterialUser.create({
      done: true, 
      MaterialId: material.id,
      UserId
    }); 

    await addPoints(UserId, 1);
    if (!material.complementary) {
      await materialModuleProgress(material.ModuleId, UserId);
    }
  } catch (err) {
    console.log(err)
    throw 400;
  }
}

const getQuiz = async (QuizId, UserId) => {
  try {
    const quizUser = await QuizUser.findOne({ 
      where: { UserId, QuizId },
      attributes: ['done', 'attempts']
    });  
    return quizUser;
  } catch (err) {
    throw 400;
  }
}

const getDoneQuizzes = async (ModuleId, UserId) => {
  try {
    const doneQuizzes = await QuizUser.findAll({ 
      where: { 
        UserId,  
        QuizId: {
          [Sequelize.Op.in]: Sequelize.literal(`(SELECT id FROM Quizzes WHERE module_id = ${ModuleId})`)
        },
        done: true
      },
      attributes: ['id', 'QuizId']
    });
    return doneQuizzes;
  } catch (err) {
    throw 400;
  }
}

const getDoneMaterials = async (ModuleId, UserId) => {
  try {
    const doneMaterials = await MaterialUser.findAll({ 
      where: { 
        UserId,  
        MaterialId: {
          [Sequelize.Op.in]: Sequelize.literal(`(SELECT id FROM Materials WHERE module_id = ${ModuleId})`)
        },
        done: true
      },
      attributes: ['id', 'MaterialId']
    });
    return doneMaterials;
  } catch (err) {
    throw 400;
  }
}

const getDoneProblems = async (ModuleId, UserId) => {
  try {
    const doneProblems = await ProblemUser.findAll({ 
      where: { 
        UserId,  
        ProblemId: {
          [Sequelize.Op.in]: Sequelize.literal(`(SELECT id FROM Problems WHERE module_id = ${ModuleId})`)
        },
        done: true
      },
      attributes: ['id', 'ProblemId']
    });
    return doneProblems;
  } catch (err) {
    throw 400;
  }
}

const saveQuiz = async (QuizId, UserId, quizUser, done) => {
  try {
    let attempts;
    if (!quizUser) {
      attempts = 1;
      await QuizUser.create({
        QuizId,
        UserId,
        done,
        attempts
      }); 
    } else {
      attempts = quizUser.attempts + 1;
      await QuizUser.update({
        attempts,
        done
      }, { where: { UserId, QuizId }})
    }

    if (done) {
      await addPoints(UserId, Math.max(6-attempts, 3));
      await quizModuleProgress(QuizId, UserId);
    }
  } catch (err) {
    throw 400;
  }
}

const getProblem = async (ProblemId, UserId) => {
  try {
    const problemUser = await ProblemUser.findOne({ 
      where: { UserId, ProblemId },
      attributes: ['done', 'attempts', 'oracle']
    });  
    return problemUser;
  } catch (err) {
    throw 400;
  }
}

const saveProblem = async (ProblemId, UserId, problemUser, done) => {
  try {
    let attempts;
    if (!problemUser) {
      attempts = 1;
      await ProblemUser.create({
        ProblemId,
        UserId,
        done,
        attempts,
        oracle: false
      }); 
    } else {
      attempts = problemUser.attempts + 1;
      await ProblemUser.update({
        attempts,
        done
      }, { where: { UserId, ProblemId }})
    }

    if (done) {
      await addPoints(UserId, Math.max(11-attempts, 5));
      await problemModuleProgress(ProblemId, UserId);
    }
  } catch (err) {
    throw 400;
  }
}

const saveOracle = async (ProblemId, UserId, problemUser, inputOnly) => {
  try {
    if (!problemUser) {
      await ProblemUser.create({
        ProblemId,
        UserId,
        done: false,
        attempts: 0,
        oracle: true
      }); 
      if (!inputOnly) {
        await addPoints(UserId, 2);
      }
    } else {
      await ProblemUser.update({
        oracle: true
      }, { where: { UserId, ProblemId }})
    }
  } catch (err) {
    throw 400;
  }
}

const ranking = async () => {
  try{
    const user = await PointsUser.findAll({
      include: { association: 'user' }
    });
    return user;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  getPoints,
  getMaterial,
  getDoneQuizzes,
  getDoneMaterials,
  getDoneProblems,
  saveMaterial,
  getQuiz,
  saveQuiz,
  getProblem,
  saveProblem,
  saveOracle,
  ranking
};
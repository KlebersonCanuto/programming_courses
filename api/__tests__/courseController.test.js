const courseController = require('../controller/courseController');
const { Course } = require('../database/models');

describe("Test Sequelize Mocking", () => {  
  beforeAll(() => {
    Course.destroy({ where: {} });
  });

  it("Should get no course", async () => {
    const courses = await courseController.getAll();
    expect(courses.length).toEqual(0);
  })

  it("Should create course", async () => {
    const course = await courseController.create({
      name: "Course",
    });
    expect(course.name).toEqual("Course");
  })

  it("Should get 1 course", async () => {
    const courses = await courseController.getAll();
    expect(courses.length).toEqual(1);
  })
})
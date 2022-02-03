const courseController = require('../controller/courseController');
const { Course } = require('../database/models');
const errors = require('../utils/errors');

describe("Test Course", () => {  
  let id;

  beforeAll(async () => {
    await Course.destroy({ where: {} });
  });

  it("Should get no course", async () => {
    const courses = await courseController.getAll();
    expect(courses.length).toEqual(0);
  })

  it("Should create course", async () => {
    const course = await courseController.create({
      name: "Course",
    });
    id = course.id;
    expect(course.name).toEqual("Course");
  })

  it("Should update course", async () => {
    await courseController.update(id, {
      name: "Course2",
    });
  })

  it("Should get by id", async () => {
    const course = await courseController.getById(id);
    expect(course.id).toEqual(id);
    expect(course.name).toEqual("Course2");
  })

  it("Should get 1 course", async () => {
    const courses = await courseController.getAll();
    expect(courses.length).toEqual(1);
  })

  it("Should get no course locked", async () => {
    const courses = await courseController.getAllLocked();
    expect(courses.length).toEqual(0);
  })

  it("Should list no course with user", async () => {
    const courses = await courseController.getAllUser(1);
    expect(courses.length).toEqual(0);
  })

  it("Should get no course with user (course unlocked)", async () => {
    const course = await courseController.getUser(id, 1);
    expect(course).toEqual(null);
  })

  it("Should get no course by id (not exists)", async () => {
    const course = await courseController.getById(id*2);
    expect(course).toEqual(null);
  })

  it("Should get course unlocked", async () => {
    const lock = await courseController.checkCourseLocked(id);
    expect(lock).toEqual(false);
  })

  it("Should lock course", async () => {
    await courseController.lock(id);
  })

  it("Should get 1 course locked", async () => {
    const courses = await courseController.getAllLocked();
    expect(courses.length).toEqual(1);
  })

  it("Should get course locked", async () => {
    const lock = await courseController.checkCourseLocked(id);
    expect(lock).toEqual(true);
  })

  it("Should get course without done user", async () => {
    const course = await courseController.getUser(id, 1);
    expect(course.done).toEqual(null);
  })

  it("Should list course with user", async () => {
    const courses = await courseController.getAllUser(1);
    expect(courses.length).toEqual(1);
  })

  it("Should fail to get all courses", async () => {
    const spy = jest.spyOn(Course, 'findAll').mockImplementation(() => { throw new Error('error') });
    await expect(courseController.getAll()).rejects.toThrow(errors.FAILED_TO_GET_COURSES);
    spy.mockRestore();
  })

  it("Should fail to get all locked courses", async () => {
    const spy = jest.spyOn(Course, 'findAll').mockImplementation(() => { throw new Error('error') });
    await expect(courseController.getAllLocked()).rejects.toThrow(errors.FAILED_TO_GET_COURSES);
    spy.mockRestore();
  })

  it("Should fail to get all courses with user", async () => {
    const spy = jest.spyOn(Course, 'findAll').mockImplementation(() => { throw new Error('error') });
    await expect(courseController.getAllUser()).rejects.toThrow(errors.FAILED_TO_GET_COURSES);
    spy.mockRestore();
  })

  it("Should fail to get couse with user", async () => {
    const spy = jest.spyOn(Course, 'findOne').mockImplementation(() => { throw new Error('error') });
    await expect(courseController.getUser(id, 1)).rejects.toThrow(errors.FAILED_TO_GET_COURSE);
    spy.mockRestore();
  })

  it("Should fail to get couse by id", async () => {
    const spy = jest.spyOn(Course, 'findByPk').mockImplementation(() => { throw new Error('error') });
    await expect(courseController.getById(id)).rejects.toThrow(errors.FAILED_TO_GET_COURSE);
    spy.mockRestore();
  })

  it("Should fail to create couse", async () => {
    const spy = jest.spyOn(Course, 'create').mockImplementation(() => { throw new Error('error') });
    await expect(courseController.create({
      name: "Course 2",
    })).rejects.toThrow(errors.FAILED_TO_CREATE_COURSE);
    spy.mockRestore();
  })

  it("Should fail to create couse (invalid name)", async () => {
    await expect(courseController.create({
      name: "",
    })).rejects.toThrow(errors.FAILED_TO_CREATE_COURSE);
  })

  it("Should fail to create couse (without name)", async () => {
    await expect(courseController.create({
    })).rejects.toThrow(errors.FAILED_TO_CREATE_COURSE);
  })

  it("Should fail to update couse", async () => {
    const spy = jest.spyOn(Course, 'update').mockImplementation(() => { throw new Error('error') });
    await expect(courseController.update(id, {
      name: "Course 2",
    })).rejects.toThrow(errors.FAILED_TO_UPDATE_COURSE);
    spy.mockRestore();
  })

  it("Should fail to update couse (invalid name)", async () => {
    await expect(courseController.update(id, {name: ""})).rejects.toThrow(errors.FAILED_TO_UPDATE_COURSE);
  })

  it("Should fail to remove couse", async () => {
    const spy = jest.spyOn(Course, 'destroy').mockImplementation(() => { throw new Error('error') });
    await expect(courseController.remove(id)).rejects.toThrow(errors.FAILED_TO_REMOVE_COURSE);
    spy.mockRestore();
  })

  it("Should fail to lock couse", async () => {
    const spy = jest.spyOn(Course, 'update').mockImplementation(() => { throw new Error('error') });
    await expect(courseController.lock(id)).rejects.toThrow(errors.FAILED_TO_LOCK_COURSE);
    spy.mockRestore();
  })

  it("Should fail to check course locked", async () => {
    const spy = jest.spyOn(Course, 'findByPk').mockImplementation(() => { throw new Error('error') });
    await expect(courseController.checkCourseLocked(id)).rejects.toThrow(errors.FAILED_TO_CHECK_COURSE_LOCKED);
    spy.mockRestore();
  })

  it("Should fail to check course locked (course not found)", async () => {
    await expect(courseController.checkCourseLocked(id*2)).rejects.toThrow(errors.FAILED_TO_CHECK_COURSE_LOCKED);
  })

  it("Should remove course", async () => {
    const qtd = await courseController.remove(id);
    expect(qtd).toEqual(1);
  })
})
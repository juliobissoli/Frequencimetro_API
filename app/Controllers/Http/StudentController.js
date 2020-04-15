"use strict";
const Student = use("App/Models/Student");
const Attendance = use("App/Models/Attendance");

const Database = use("Database");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with students
 */
class StudentController {
  /**
   * Show a list of all students.
   * GET students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const data = request.only(["currentPage", "perPage"]);

    var student = [];
    student = await Student.query()
      .with("attendances", (el) => {
        el.where("date", date);
      })
      .orderBy("name", "cres")
      .forPage(data.currentPage, data.perPage)
      .fetch();

    return student;
  }

  /**
   * Create/save a new student.
   * POST students
   *
   * @param {object} ctx
   * @param {Request0} ctx.request
   * @param {Response} ctx.response
   */

  async store({ request, auth, response }) {
    const data = request.only([
      "name",
      "email",
      "telephone",
      "address",
      "cpf",
      "modality",
      "situation",
      "payment",
      "hour",
      "days",
    ]);

    if (auth.user.type !== "admin") {
      return response
        .status(401)
        .send({ error: "Usuario não aturizado para essa operação" });
    }

    const user = await Student.findOrCreate({ cpf: data.cpf }, data);

    return user;
  }

  /**
   * Display a single student.
   * GET students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const students = await Student.findOrFail(params.id);
    await students.load("attendances");
    return students;
  }

  /**
   * Update student details.
   * PUT or PATCH students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const data = request.only([
      "name",
      "email",
      "telephone",
      "address",
      "cpf",
      "modality",
      "situation",
      "payment",
      "hour",
      "days",
    ]);
    const students = await Student.findOrFail(params.id);

    if (auth.user.type !== "admin") {
      return response
        .status(401)
        .send({ error: "Usuario não aturizado para essa operação" });
    }
    students.merge(data);
    await students.save(data);
    return students;
  }

  /**
   * Delete a student with id.
   * DELETE students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const student = await Student.find(params.id);

    if (auth.user.type !== "admin") {
      return response.status(401).send({ error: "Não autorizado" });
    }

    await student.delete();
  }
}

module.exports = StudentController;

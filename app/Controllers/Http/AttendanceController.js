"use strict";
const Attendance = use("App/Models/Attendance");
const Database = use("Database");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with attendances
 */
class AttendanceController {
  /**
   * Show a list of all attendances.
   * GET attendances
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const attendances = await Attendance.all();

    return attendances;
  }

  /**
   * Create/save a new attendance.
   * POST attendances
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["student_id"]);
    const today = new Date();
    var hour = today.getHours();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() - 1) +
      "-" +
      (today.getDate() - 10);

    const attendance = await Attendance.findOrCreate(
      { ...data, date },
      { ...data, hour, date }
    );

    return attendance;
  }

  /**
   * Display a single attendance.
   * GET attendances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing attendance.
   * GET attendances/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update attendance details.
   * PUT or PATCH attendances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a attendance with id.
   * DELETE attendances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const attendance = await Attendance.find(params.id);
    await attendance.delete();
  }


}

module.exports = AttendanceController;

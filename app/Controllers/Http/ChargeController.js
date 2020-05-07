"use strict";

const Charge = use("App/Models/Charge");
const Database = use("Database");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with charges
 */
class ChargeController {
  /**
   * Show a list of all charges.
   * GET charges
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { perPage, currentPage, period } = request.only(["perPage", "currentPage", "period"]);

    const charges = await Charge.query()
      .with("payments")
      .orderBy("date_end", "desc")
      .perPeriod(period)
      .forPage(currentPage, perPage)
      .fetch();
    return { currentPage, perPage, data: charges };
  }

  /**
   * Render a form to be used for creating a new charge.
   * GET charges/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new charge.
   * POST charges
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const data = request.only(["period", "date_end", "payment"]);

    if (auth.user.type !== "admin") {
      return response
        .status(401)
        .send({ error: "Usuario não aturizado para essa operação" });
    }

    const charge = await Charge.findOrCreate({ period: data.period }, data);

    return charge;
  }

  /**
   * Display a single charge.
   * GET charges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    // const created_at = request.only(["created_at"]);

    const charges = await Charge.query()
      .with("payments", (el) => {
        el.where("student_id", params.id);
      })
      .orderBy("date_end", "desc")
      .fetch();

    return charges;
  }

  /**
   * Render a form to update an existing charge.
   * GET charges/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update charge details.
   * PUT or PATCH charges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, auth, request, response }) {
    const data = request.only(["period", "date_end", "payment"]);

    const charge = await Charge.findOrFail(params.id);

    if (auth.user.type !== "admin") {
      return response
        .status(401)
        .send({ error: "Usuario não aturizado para essa operação" });
    }

    charge.merge(data);
    await charge.save(data);

    return charge;
  }

  /**
   * Delete a charge with id.
   * DELETE charges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const charge = await Charge.find(params.id);

    return charge.delete();
  }
}

module.exports = ChargeController;

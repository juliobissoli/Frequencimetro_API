"use strict";

const Payment = use("App/Models/Payment");
const Database = use("Database");
const Charge = use("App/Models/Charge");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with payments
 */
class PaymentController {
  /**
   * Show a list of all payments.
   * GET payments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let data = request.only(["charge_id"]);
    console.log('ta certo ')
    const payments = await Payment.query()
      .perPeriod(data.charge_id)
      .with("students")
      .with("charges")
      .orderBy("created_at", "desc")
      .forPage(1, 30)
      .fetch();
    return payments ;
  }

  /**
   * Create/save a new payment.
   * POST payments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const data = request.only([
      "value",
      "charge_value",
      "date",
      "student_id",
      "charge_id",
    ]);

    if (auth.user.type !== "admin") {
      return response
        .status(401)
        .send({ error: "Usuario não aturizado para essa operação" });
    }

    const payment = await Payment.create(data);

    await this.updatePercent(data.charge_id);

    return payment;
  }

  async updatePercent(id) {
    //-----------Update the percent-----------//
    const payForPeriod = await Database.from("charges")
      .leftJoin("payments", "payments.charge_id", "charges.id")
      .where("charges.id", id)
      .getCount();

    const students = await Database.from("students").getCount();

    const charge = await Charge.findOrFail(id);

    const payment = ((payForPeriod / students) * 100).toFixed(0);
    charge.merge({ payment });

    await charge.save({ payment });
  }
  /**
   * Display a single payment.
   * GET payments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const payments = await Payment.query()
      .where("student_id", params.id)
      .with("charges")
      .with("students")
      .fetch();

    return payments;
  }

  /**
   * Render a form to update an existing payment.
   * GET payments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update payment details.
   * PUT or PATCH payments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a payment with id.
   * DELETE payments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const payment = await Payment.find(params.id);

    const res = payment.delete();

    return res;
  }
}

module.exports = PaymentController;

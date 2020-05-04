"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Payment extends Model {
  charges() {
    return this.belongsTo("App/Models/Charge");
  }

  students() {
    return this.belongsTo("App/Models/Student");
  }

  static scopePerPeriod(query, search) {

    if (search) {
      return query.where("charge_id", search);
    } else return query;
  }
}

module.exports = Payment;

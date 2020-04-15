"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Attendance extends Model {
  static scopeNearBy(query) {
    return query.select("*").whereBetween("id", [0, 3]);
  }

  students() {
    return this.belongsTo("App/Models/Student");
  }
}

module.exports = Attendance;

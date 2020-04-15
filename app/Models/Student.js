"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Database = use("Database");

class Student extends Model {
  static scopeNearBy(query) {
//    const t = Database.from("users").count("id");
    return query.select("*", Database.raw("users"));
  }

  attendances() {
    return this.hasMany("App/Models/Attendance");
  }
}

module.exports = Student;

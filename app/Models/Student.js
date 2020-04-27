"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Database = use("Database");

class Student extends Model {

  static scopeNearBy(query, search) {
    if (search) {
      if (!isNaN(search)) {
        return query.where("id",search);
      } 
      else {
        return query.where("name", "LIKE", `%${search}%`);
      }
    } else return query;

  }

  attendances() {
    return this.hasMany("App/Models/Attendance");
  }
}

module.exports = Student;

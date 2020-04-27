"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Attendance extends Model {
  static get dates() {
    return super.dates.concat(["created_at"]);
  }

  static castDates(field, value) {                                                                                                               
    if (field === 'created_at') {                                                                                                                       
      return value.format('YYYY-MM-DD')                                                                                                          
    }                                                                                                                                            
  }

  students() {
    return this.belongsTo("App/Models/Student");
  }
}

module.exports = Attendance;

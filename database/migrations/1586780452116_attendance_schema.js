'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttendanceSchema extends Schema {
  up () {
    this.create('attendances', (table) => {
      table.increments()
      table.timestamps()
      table.integer('student_id')
      .unsigned()
      .references('id')
      .inTable('students')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.decimal('hour').notNullable()
      table.string('date').notNullable()
    })
  }

  down () {
    this.drop('attendances')
  }
}

module.exports = AttendanceSchema

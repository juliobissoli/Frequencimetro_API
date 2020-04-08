'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 80).notNullable()
      table.string('email', 254),
      table.string('telephone', 20),
      table.string('address', 254),
      table.string('cpf', 20)
      table.string('schedules', 255),
      table.decimal('payment')
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema

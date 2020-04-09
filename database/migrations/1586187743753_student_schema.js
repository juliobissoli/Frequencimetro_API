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
      table.string('cpf', 20),
      table.string('modality', 255),
      table.string('situation', 255),
      table.decimal('payment'),
      table.decimal('hour'),
      table.string('days', 200)
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments()
      table.decimal('value')
      table.decimal('charge_value')
      table.string('date')
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.integer('charge_id').unsigned().references('id').inTable('charges')
      table.timestamps()

    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentSchema

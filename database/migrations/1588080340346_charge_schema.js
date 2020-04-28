'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChargeSchema extends Schema {
  up () {
    this.create('charges', (table) => {
      table.increments()
      table.timestamps()
      table.string('period')
      table.string('date_end')
      table.decimal('payment')
    })
  }

  down () {
    this.drop('charges')
  }
}

module.exports = ChargeSchema

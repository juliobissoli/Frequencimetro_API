'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Charge extends Model {

    static get dates() {
        return super.dates.concat(["created_at"]);
      }
    
      static castDates(field, value) {                                                                                                               
        if (field === 'created_at') {                                                                                                                       
          return value.format('YYYY-MM-DD')                                                                                                          
        }                                                                                                                                            
      }
      
}

module.exports = Charge

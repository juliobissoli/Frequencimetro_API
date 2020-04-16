"use strict";
const Database = use("Database");

class StatisticController {
  async statistcsDay({ request }) {
    const {min, max, day, date} = request.only(['min', 'max', 'day', 'date'])

    let maxTotal = 0
    // const day = 'Sexta'
    // const totalHour = await Database.from("attendances").pluck('hour');
    const statis = []
    for(var i = min*1; i < max*1; i++){
        const total = await Database
        .from("students")
        .where("days", "LIKE", `%${day}%`)
        .andWhere('hour', i)
        .getCount()

        const subTotal = await Database
        .from("attendances")
        .where("hour",i)
        .andWhere('date', date)
        .getCount()

        total > maxTotal ? maxTotal = total: null
        subTotal > maxTotal ? maxTotal = subTotal: null

        statis.push({label: i+'h', total, subTotal})
      }
    
    return {maxTotal, statis}
  }

}

module.exports = StatisticController;

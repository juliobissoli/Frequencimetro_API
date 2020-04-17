"use strict";
const Database = use("Database");

class StatisticController {

  async statistcsDay({ request }) {
    const {min, max, day, date} = request.only(['min', 'max', 'day', 'date'])
    const t = day.split('-')
    console.log(t)
    let maxTotal = 0
    let matriculated = 0
    let attendanties = 0
    // const day = 'Sexta'
    // const totalHour = await Database.from("attendances").pluck('hour');
    const statis = []
    for(var i = min*1; i < max*1; i++){
        const total = await Database
        .from("students")
        .where("days", "LIKE", `%${t[0]}%`)
        .andWhere('hour', i)
        .getCount()

        matriculated += total *1

        const subTotal = await Database
        .from("attendances")
        .where("hour",i)
        .andWhere('date', date)
        .getCount()

        attendanties+= subTotal * 1

        total > maxTotal ? maxTotal = total: null

        subTotal > maxTotal ? maxTotal = subTotal: null

        statis.push({label: i, total, subTotal})
      }
    
    return {matriculated,attendanties,maxTotal, statis}
  }

  async statisticsStudent({params}){
    const id = params.id
    const statistics = []
    let maxTotal = 0
    for(var i = 1; i<13; i++){
      let t = '2020-'+ i
      let total = await Database
      .from('attendances')
      .where('student_id', id)
      .andWhere('date', "LIKE", `%${t}%`)
      .getCount()

      total > maxTotal ? maxTotal = total: null

      statistics.push({label: i, total})
    }

    return {maxTotal, statistics}
  }

}

module.exports = StatisticController;

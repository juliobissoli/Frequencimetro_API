"use strict";
const Database = use("Database");
const Charge = use("App/Models/Charge");

class StatisticController {
  async statistcsDay({ request }) {
    const { min, max, day, date } = request.only(["min", "max", "day", "date"]);
    const t = day.split("-");
    let maxTotal = 0;
    let matriculated = 0;
    let attendanties = 0;
    // const day = 'Sexta'
    // const totalHour = await Database.from("attendances").pluck('hour');
    const statis = [];
    for (var i = min * 1; i < max * 1; i++) {
      const total = await Database.from("students")
        .where("days", "LIKE", `%${t[0]}%`)
        .andWhere("hour", i)
        .getCount();

      matriculated += total * 1;

      const subTotal = await Database.from("attendances")
        .where("hour", i)
        .andWhere("date", date)
        .getCount();

      attendanties += subTotal * 1;

      total > maxTotal ? (maxTotal = total) : null;

      subTotal > maxTotal ? (maxTotal = subTotal) : null;

      statis.push({ label: i, total, subTotal });
    }

    return { matriculated, attendanties, maxTotal, statis };
  }

  async statisticsStudent({ params, request }) {
    const { min, max } = request.only(["min", "max"]);
    const id = params.id;
    const statistics = [];
    let maxTotal = 0;

    for (var i = min; i < max; i++) {
      let t = "2020-" + i;
      let subTotal = await Database.from("attendances")
        .where("student_id", id)
        .andWhere("date", "LIKE", `%${t}%`)
        .getCount();

      subTotal > maxTotal ? (maxTotal = subTotal) : null;

      statistics.push({ label: i, subTotal, total: 0 });
    }

    return { maxTotal, statistics };
  }

  async paymenToStudnet() {
    return await Database.select("*")
      .from("charges")
      .fullOuterJoin("payments", "charges.id", "payments.charge_id");

    // .table('charges')
    // .innerJoin('payments', function () {
    //   this
    //     .on('payments.charge_id', 'charges.id')
    // })
  }

  async updatePercentPayment({ request, params }) {
    const payForPeriod = await Database.from("charges")
      .leftJoin("payments", "payments.charge_id", "charges.id")
      .where("charges.id", params.id)
      .getCount();

    const students = await Database.from("students").getCount();

    const charge = await Charge.findOrFail(params.id);

    const payment = ((payForPeriod / students) * 100).toFixed(0);
    charge.merge({ payment });

    await charge.save({ payment });

    return charge;
  }
}

module.exports = StatisticController;

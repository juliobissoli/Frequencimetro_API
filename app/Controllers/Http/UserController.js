"use strict";

const User = use("App/Models/User");

class UserController {
  async create({ request }) {
    const data = request.only(["name", "email", "password", "type"]);

    const user = await User.create(data);

    return user;
  }

  async index() {
    return await User.query().select('id',"name", "email", "type").fetch();
  }

  async show({ params }) {
    const user = await User.find(params.id);

    return {
      name: user.name,
      email: user.email,
      type: user.type,
      uid: user.id,
      isAdmin: user.type === "admin" ? true : false,
    };
  }

  async destroy({ params }) {
    const user = await User.find(params.id);

    return user.delete();
  }
}

module.exports = UserController;

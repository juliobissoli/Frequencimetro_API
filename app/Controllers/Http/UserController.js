"use strict";

const User = use("App/Models/User");

class UserController {
  async create({ request, auth, response }) {
    const data = request.only(["name", "email", "password", "type"]);
    console.log('type user->', auth.user.type)
    if (auth.user.type !== "admin") {
      return response
        .status(401)
        .send({ error: "Usuario não aturizado para essa operação" });
    } 
    
    else {
      const user = await User.create(data);

      return user;
    }
  }

  async index() {
    return await User.query().select("id", "name", "email", "type").fetch();
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

  async destroy({ params, auth, response }) {
    const user = await User.find(params.id);

    // if (auth.user.type !== "admin") {
    //   return response
    //     .status(401)
    //     .send({ error: "Usuario não aturizado para essa operação" });
    // } 
    return user.delete();
  }
}

module.exports = UserController;

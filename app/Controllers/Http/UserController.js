'use strict'

const User = use("App/Models/User")
class UserController {

    //Function create
    async create({request}){
        const data = request.only(["name", "type", "email", "password"])

        const user = await User.create(data)

        return user
    }
}

module.exports = UserController

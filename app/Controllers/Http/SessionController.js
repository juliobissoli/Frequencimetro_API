'use strict'

class SessionController {
  async create ({ request, auth }) { 
    const { email, password } = request.all()
    console.log("acesaram a api-> ", email, password)


    const token = await auth.attempt(email, password)
    return token
  }
}

module.exports = SessionController
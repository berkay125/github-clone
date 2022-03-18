import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import UserControlValidator from 'App/Validators/UserControlValidator'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    await request.validate(UserControlValidator)
    const user = await User.create({
      name: request.input('name', 'berkay'),
      surname: request.input('surname', 'kk'),
      email: request.input('email'),
      password: request.input('password')
    })
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    //giriş yaparken
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}

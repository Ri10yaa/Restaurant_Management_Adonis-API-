/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { addCustomer } from '../repositories/customer_repo.js'
import { postCustomer, postUser, postStaff } from '#validators/user'
import { addStaff } from '../repositories/staff_repo.js'
export default class UsersController {
  async register({ request }: HttpContext) {
    try {
      const payload = await postUser.validate(request.body())

      const user = await User.create(payload)

      if (payload.role === 'customer') {

        const payloadCus = await postCustomer.validate(request.body())
        await addCustomer(payloadCus.name, user.id, payloadCus.phno)

      }
      else if( payload.role === 'staff' || payload.role === 'manager' ){

        const payloadS = await postStaff.validate(request.body())
        await addStaff(payloadS.name, user.id, payloadS.phno, payloadS.role)
        
      }

      const token = await User.accessTokens.create(user, ['*'], {
        expiresIn: '30 days',
      })
      return {
        success: true,
        data: token,
      }
    } catch (err) {
      throw err
    }
  }
  async login({ request }: HttpContext) {
    try {
      const payload = await postUser.validate(request.body())

      const user = await User.verifyCredentials(payload.email, payload.password)
      const token = await User.accessTokens.create(user)

      return {
        success: true,
        data: token,
      }
    } catch (err) {
      throw err
    }
  }

  async logout({ auth }: HttpContext) {
    try {
      const user = await auth.user!

      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      return { success: true }
    } catch (err) {
      throw err
    }
  }
  async me({ auth }: HttpContext) {
    try {
      await auth.check()
      return {
        user: auth.user,
      }
    } catch (err) {
      throw err
    }
  }
}

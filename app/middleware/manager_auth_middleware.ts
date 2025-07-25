import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ManagerAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.auth.user?.role !== 'manager') {
      throw new Exception('Invalid user')
    }
    return next()
  }
}

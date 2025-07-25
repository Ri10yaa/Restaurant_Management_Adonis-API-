/* eslint-disable prettier/prettier */
import {
  postDishes,
  postOrder,
  validateId,
  validateDish,
  validateStatus,
  validateDeleteDish,
  validateCusId
} from '#validators/order'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createOrder,
  getOrderByCusId,
  deleteOrderById,
  updateOrderStatus,
  calculateAmount,
} from '../repositories/orders_repo.js'
import { createDish, deleteDishById } from '../repositories/orderDish_repo.js'

export default class OrdersController {
  async store({ request }: HttpContext) {
    try {
      const payload = await postOrder.validate(request.body())
      const order = await createOrder(payload)

      let dishes = [{}]

      for( const ele of request.body().dishes){
        const dish = await postDishes.validate(ele)
        const itm = await createDish(order.id, dish)
        dishes.push(itm)
      }
      await calculateAmount(order.id)
      return { success: true, data: { order: order, items: dishes } }
    } catch (err) {
      throw err
    }
  }

  async show({ params }: HttpContext) {
    try {
      const param = await validateCusId.validate(params)
      const data = await getOrderByCusId(param.id)

      return { success: true, data: data }
    } catch (err) {
      throw err
    }
  }

  async updateByDish({ params, request }: HttpContext) {
    try {
      const param = await validateId.validate(params)
      const dish = await validateDish.validate(request.body())

      const res = await createDish(param.id, dish)
      await calculateAmount(param.id)

      return { success: true, data: res }
    } catch (err) {
      throw err
    }
  }

  async updateByDeleteDish({ params }: HttpContext) {
    try {
      const param = await validateDeleteDish.validate(params)

      const res = await deleteDishById(param.id, param.foodId)
      await calculateAmount(param.id)

      return { success: true, data: res }
    } catch (err) {
      throw err
    }
  }

  async updateOrderStatus({ params, request }: HttpContext) {
    const param = await validateId.validate(params)
    const payload = await validateStatus.validate(request.body())

    const res = await updateOrderStatus(param.id, payload.status)

    return { success: true, data: res }
  }

  async destroy({ params }: HttpContext) {
    try {
      const param = await validateId.validate(params)
      await deleteOrderById(param.id)

      return { success: true, data: 'Order deleted' }
    } catch (err) {
      throw err
    }
  }
}

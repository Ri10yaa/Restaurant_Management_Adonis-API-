/* eslint-disable prettier/prettier */
import { postDishes, postOrder, validateId, validateDishId, validateDish, validateStatus } from '#validators/order'
import type { HttpContext } from '@adonisjs/core/http'
import { createOrder, createDishes, getOrderById, deleteOrderById, deleteDishById, updateDishesById, updateOrderStatus } from '../repositories/orders_repo.js';


export default class OrdersController {
  async store({ request }: HttpContext) {
    try {
      const payload = await postOrder.validate(request.body())
      const order = await createOrder(payload)

  
      await request.body().dishes.forEach(async(element : {food_id: number, qty: number}) => {
        const dish = await postDishes.validate(element)
        await createDishes(order.id,dish)
      });
      

      return { success: true, data: order }
    } catch (err) {
      throw err;
    }

  }

  async show({ params }: HttpContext) {
    try {
      const param = await validateId.validate(params.id)
      const data = await getOrderById(param.id)

      return { success: true, data: data}
    } catch (err) {
      throw err;
    }
  }

  async updateOrderDish({ request }: HttpContext) { 
    try{
      const payload = await validateDish.validate(request.body())
      const res = await updateDishesById(payload)

      return { success: true, data: res}
    }catch(err){
      throw err;
    }
  }

  async updateOrderStatus({ params, request }: HttpContext) {
      const param = await validateId.validate(params)
      const payload = await validateStatus.validate(request.body())

      const res = await updateOrderStatus(param.id, payload.status)

      return { success: true, data: res}
   }

  async destroy({ params }: HttpContext) {
      try {
      const param = await validateId.validate(params.id)
      await deleteOrderById(param.id)

      return { success: true, data: 'Order deleted'}
    } catch (err) {
      throw err;
    }
   }

   async deleteDishById({ request }: HttpContext ){
    try{
      const payload = await validateDishId.validate(request.body())
      await deleteDishById(payload.order_id, payload.food_id)

    }catch(err){
      throw err;
    }
   }

}
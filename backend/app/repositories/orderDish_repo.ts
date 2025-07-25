/* eslint-disable @unicorn/filename-case */
import { incrementCount, decrementCount } from './food_repo.js'
import OrderDish from '#models/order_dish'

export const getDishes = async (order_id: number) => {
  const res = await OrderDish.query().select('*').where('order_id', order_id)
  return res
}
export const createDish = async (order_id: number, payload: { food_id: number; qty: number }) => {
  console.log(`entered repo func..`)
  const dish = await OrderDish.query()
    .where('order_id', order_id)
    .andWhere('food_id', payload.food_id)
    .first()

  let res

  if (dish) {
    if (dish && dish?.qty > payload.qty) {
      let dif = dish?.qty - payload.qty
      await incrementCount(payload.food_id, dif)
    } else if (dish && dish?.qty < payload.qty) {
      let dif = payload.qty - dish?.qty
      await decrementCount(payload.food_id, dif)
    }
    res = await dish?.merge(payload).save()
  } else {
    res = await OrderDish.create({
      order_id: order_id,
      food_id: payload.food_id,
      qty: payload.qty,
    })
    await decrementCount(payload.food_id, payload.qty)
  }

  return res
}

export const deleteDishById = async (order_id: number, food_id: number) => {
  const dish = await OrderDish.query()
    .where('order_id', order_id)
    .andWhere('food_id', food_id)
    .first()
  if (dish) {
    await incrementCount(dish.food_id, dish?.qty)
  }
  await dish?.delete()
}

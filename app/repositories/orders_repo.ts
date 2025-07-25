/* eslint-disable prettier/prettier */
import Order from '#models/order'
import OrderDish from '#models/order_dish'
import Food from '#models/food'
import { Status } from '../validators/order.js'
import { incrementCount, decrementCount } from './food_repo.js'
import { getDishes } from './orderDish_repo.js'

export const calculateAmount = async (order_id: number) => {
  const dishes = await getDishes(order_id)
  let totAmt = 0
  dishes.forEach(async (ele) => {
    const food = await Food.findOrFail(ele.food_id)
    totAmt += ele.qty * food.price
  })
  const order = await Order.findOrFail(order_id)
  order.amount = totAmt
  return order.save()
}
export const getOrderByCusId = async (id: number) => {
  let data = []
  const orders = await Order.query().select('*').where('cus_id', id)
  for (const order of orders) {
    const itms = await OrderDish.findManyBy('order_id', order.id)
    data.push({ order: order, dishes: itms })
  }

  return data
}

export const createOrder = async (payload: { cus_id: number }) => {
  const res = await Order.create(payload)
  return res
}

export const updateOrderStatus = async (id: number, status: Status) => {
  const order = await Order.findOrFail(id)
  order.status = status
  return order.save()
}

export const deleteOrderById = async (id: number) => {
  const order = await Order.findOrFail(id)
  if (order.status !== 'delivered') {
    const orders = await OrderDish.findManyBy('order_id', id)
    orders.forEach(async (ord) => {
      await incrementCount(ord.food_id, ord.qty)
    })
  }
  await order.delete()
}

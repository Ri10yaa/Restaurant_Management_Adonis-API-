/* eslint-disable prettier/prettier */
import Order from "#models/order";
import OrderDish from "#models/order_dish";
import { Status } from '../validators/order.js'
import { incrementCount, decrementCount } from "./food_repo.js";
export const getOrderById = async (id: number) =>{
    const order = await Order.findOrFail(id)
    const dishes = await OrderDish.findManyBy('order_id', 'id')
    return { order : order, dishes: dishes}
}

export const createOrder = async (payload : {cus_id: number, status: Status, amount: number}) =>{
    const res = await Order.create(payload)
    return res
}

export const createDishes = async (order_id: number,payload: {food_id: number, qty: number}) =>{
    const res = await OrderDish.create({
        order_id: order_id,
        food_id: payload.food_id,
        qty: payload.qty
    })
    await decrementCount(payload.food_id, payload.qty);
    return res
}

export const updateOrderStatus = async(id: number, status: Status) =>{
    const order = await Order.findOrFail(id)
    order.status = status
    return order.save()
}
export const updateDishesById = async(payload : {order_id: number, food_id: number, qty: number}) =>{
    const dish = await OrderDish.query().where('order_id',payload.order_id).andWhere('food_id', payload.food_id).first();
    if(dish && dish?.qty > payload.qty){
        let dif = dish?.qty - payload.qty
        await incrementCount(payload.food_id, dif)
    }
    else if(dish && dish?.qty < payload.qty){
        let dif = payload.qty - dish?.qty
        await decrementCount(payload.food_id, dif)
    }
    return await dish?.merge(payload).save()
}
export const deleteOrderById = async (id: number) => {
    const order = await Order.findOrFail(id)
    if(order.status !== 'delivered'){
        const orders = await OrderDish.findManyBy('order_id',id)
        orders.forEach(async (ord) =>{
            await incrementCount(ord.food_id,ord.qty)
        })
    }
    await order.delete()
}

export const deleteDishById = async(order_id: number, food_id: number) =>{
    const dish = await OrderDish.query().where('order_id',order_id).andWhere('food_id', food_id).first();
    if(dish){
        await incrementCount(dish.food_id, dish?.qty)
    }
    await dish?.delete()
    
}

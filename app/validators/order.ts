/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'
import { checkID } from '#start/Rules/check_id'
import { checkAvail } from '#start/Rules/check_avail'
import { checkorder } from '#start/Rules/checkOrder'
export enum Status {
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export const validateId = vine.compile(
  vine.object({
    id: vine.number().use(checkID({ table: 'orders' })),
  })
)

export const validateDishId = vine.compile(
  vine.object({
    order_id: vine.number().use(checkID({ table: 'orders' })),
    food_id: vine.number().use(checkorder()),
  })
)

export const postOrder = vine.compile(
  vine.object({
    cus_id: vine.number().use(checkID({ table: 'customers' })),
    status: vine.enum(Status),
    amount: vine.number().transform((value) => {
      return value ?? 0
    }),
  })
)

export const postDishes = vine.compile(
  vine.object({
    qty: vine.number(),
    food_id: vine.number().use(checkAvail()),
  })
)

export const validateDish = vine.compile(
  vine.object({
    order_id: vine.number().use(checkID({ table: 'orders' })),
    food_id: vine.number().use(checkorder()),
    qty: vine.number(),
  })
)

export const validateStatus = vine.compile(
  vine.object({
    status: vine.enum(Status),
  })
)

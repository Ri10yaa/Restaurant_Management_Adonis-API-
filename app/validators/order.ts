/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'
import { checkID } from '#start/Rules/check_id'
import { checkAvail } from '#start/Rules/check_avail'

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
export const validateCusId = vine.compile(
  vine.object({
    id: vine.number().use(checkID({ table: 'customers' })),
  })
)

export const postOrder = vine.compile(
  vine.object({
    cus_id: vine.number().use(checkID({ table: 'customers' })),
    status: vine.enum(Status).optional()
  })
)

export const postDishes = vine.compile(
  vine.object({
    food_id: vine.number().use(checkID({table: 'foods'})).use(checkAvail()),
    qty: vine.number()
  })
)

export const validateDish = vine.compile(
  vine.object({
    food_id: vine.number(),
    qty: vine.number(),
  })
)

export const validateStatus = vine.compile(
  vine.object({
    status: vine.enum(Status),
  })
)

export const validateDeleteDish = vine.compile(
  vine.object({
    id: vine.number().use(checkID({table: 'orders'})),
    foodId: vine.number().use(checkID({table: 'foods'}))
  })
)

/* eslint-disable @unicorn/filename-case */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'


async function checkOrder(value: unknown, _: unknown, field: FieldContext) {
  if (typeof value !== 'number') {
    return
  }
  const row = await db
    .query()
    .select('id')
    .from('order_dishes')
    .where('food_id', value)
    .andWhere('order_id', field.data.order_id)
    .first()
  if (!row) {
    field.report('Dish do not exist in this order.', 'checkOrder', field)
  }
}

export const checkorder = vine.createRule(checkOrder)

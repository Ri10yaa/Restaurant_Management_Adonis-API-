/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'


async function checkavail(value: unknown, _: unknown, field: FieldContext) {
  if (typeof value !== 'number') {
    return
  }
  const qty = await db
    .query()
    .select('availability')
    .from('foods')
    .where('id', value)
    .first()
  if (qty < field.data.qty) {
    field.report('Food stock insufficient', 'checkAvail', field)
  }
}

export const checkAvail = vine.createRule(checkavail)

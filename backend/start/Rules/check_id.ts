/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type options = {
  table: string
}

async function checkExists(value: unknown, options: options, field: FieldContext) {
  if (typeof value !== 'number') {
    return
  }
  const row = await db
    .query()
    .select('id')
    .from(options.table)
    .where('id', value)
    .first()
  if (!row) {
    field.report(`The column id from ${options.table} does not have the ID.`, 'checkExists', field)
  }
}

export const checkID = vine.createRule(checkExists)

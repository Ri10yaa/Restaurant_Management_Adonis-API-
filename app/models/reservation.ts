/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import Table from './table.js'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cus_id: number

  @column.date()
  declare date: DateTime

   @column()
  declare startTime: string

  @column()
  declare endTime: string

   @column()
  declare persons: number

  @column()
  declare status: 'pending' | 'confirmed' | 'cancelled'

  @column()
  declare paymentStatus: 'paid' | 'unpaid'

  @column()
  declare table_id: number

  @belongsTo(()=> Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(()=> Table)
  declare table:BelongsTo<typeof Table>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
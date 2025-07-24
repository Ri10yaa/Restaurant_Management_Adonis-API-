/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import { Status } from '../validators/order.js'
export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @column()
  declare cus_id: number

  @column()
  declare status: Status

  @column()
  declare amount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Order from './order.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import Food from './food.js'

export default class OrderDish extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare order_id: number

  @column()
  declare food_id: number

  @column()
  declare qty: number

  @belongsTo(()=> Order)
  declare order: BelongsTo<typeof Order>

  @belongsTo(()=> Food)
  declare food: BelongsTo<typeof Food>
  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
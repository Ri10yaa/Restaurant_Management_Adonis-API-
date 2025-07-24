/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Food extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare veg: boolean

  @column()
  declare category: 'meals'| 'rice'|'breads'|'gravies'|'dosa'|'starters'|'desserts'|'beverages'

  @column()
  declare price: number

  @column()
  declare availability: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

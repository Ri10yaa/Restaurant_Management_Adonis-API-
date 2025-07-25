/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import { Role } from '#validators/user'
export default class Staff extends BaseModel {
  static table = 'staffs'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string
  
  @column()
  declare user_id: number
  
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
  
  @column()
  declare phno: string

  @column()
  declare role: Role

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
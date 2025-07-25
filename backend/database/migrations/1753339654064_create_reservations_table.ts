/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cus_id').references('id').inTable('customers').onDelete('CASCADE').notNullable()
      table.date('date')
      table.time('start_time')
      table.time('end_time')
      table.integer('persons')
      table.enu('status',['pending','confirmed','cancelled'],{
        useNative: true,
        enumName: 'res_status',
        existingType: false
      }).defaultTo('pending')
      table.enu('payment_status',['paid','unpaid'],{
        useNative: true,
        enumName: 'payment_status',
        existingType: false
      })
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
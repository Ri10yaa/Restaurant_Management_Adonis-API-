/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cus_id').references('id').inTable('customers').onDelete('CASCADE').notNullable()
      table.enu('status',['confirmed','preparing','delivered','cancelled'],{
        useNative: true,
        enumName: 'order_status',
        existingType: false
      }).defaultTo('confirmed').notNullable()
      table.decimal('Amount').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

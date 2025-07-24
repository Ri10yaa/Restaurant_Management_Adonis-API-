import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'order_dishes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').references('id').inTable('orders').onDelete('CASCADE').notNullable()
      table.integer('food_id').references('id').inTable('foods').onDelete('CASCADE').notNullable()
      table.integer('qty').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'foods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.boolean('veg').notNullable()
      table.enu('category', ['meals', 'rice','breads','gravies','dosa','starters','desserts','beverages'],{
        useNative: true,
        enumName: 'Food category',
        existingType: false
      }).notNullable()
      table.decimal('price').notNullable()
      table.integer('availability')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

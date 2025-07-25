import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'foods'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('name')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

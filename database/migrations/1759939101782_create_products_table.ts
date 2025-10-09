import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('reference').unique().notNullable()
      table.text('description').nullable()
      table.string('image_url').nullable()
      table.string('category').nullable()
      table.decimal('price',10,2).nullable()
      table.decimal('tax',10,2).nullable()
      table.integer('stock').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare name: String

  @column()
  declare reference: String

  @column()
  declare description: String

  @column()
  declare image_url: String

  @column()
  declare category: String

  @column()
  declare price: number

  @column()
  declare tax: number

  @column()
  declare stock: number


  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

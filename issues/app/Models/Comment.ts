import { DateTime } from 'luxon'
import {BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Issue from 'App/Models/Issue'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public user_id: number
  @column()
  public title: string
  @column()
  public project_id: number
  @column()
  public notification_on: boolean
  @column()
  public description: string
  @column()
  public issue_id: number

  @belongsTo(() => Issue, {
    localKey: 'id',
    foreignKey: 'issue_id',
  })
  public issue: BelongsTo<typeof Issue>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

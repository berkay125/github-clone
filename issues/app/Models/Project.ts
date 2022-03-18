import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Issue from 'App/Models/Issue'
import User from 'App/Models/User'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column({ columnName: 'boardName' })
  public boardName: string
  @column()
  public user_id: number
  @column({ columnName: 'projectUsers' })
  public projectUsers: object
  @column()
  public description: string

  @hasMany(() => Issue, {
    localKey: 'id',
    foreignKey: 'project_id',
  })
  public issues: HasMany<typeof Issue>

  @manyToMany(() => User, {
    pivotTable: 'user_projects',
    relatedKey: 'id',
    localKey: 'id',
    pivotForeignKey: 'project_id',
    pivotRelatedForeignKey: 'user_id',
  })
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany, HasMany, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project'
import Hash from '@ioc:Adonis/Core/Hash'
import Comment from 'App/Models/Comment'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string
  @column()
  public surname: string
  @column()
  public password: string
  @column()
  public email: any
  @column()
  public rememberMeToken?: string

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @manyToMany(() => Project, {
    pivotTable: 'user_projects',
    relatedKey: 'id',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'project_id',
  })
  public projects: ManyToMany<typeof Project>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(auth: User) {
    if (auth.$dirty.password) {
      auth.password = await Hash.make(auth.password)
    }
  }
}

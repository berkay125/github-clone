
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project'
import User from 'App/Models/User'

export default class UserProject extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => Project, {
    localKey: 'project_id',
    relatedKey: 'id',
  })
  public projects: ManyToMany<typeof Project>

  @manyToMany(() => User, {
    localKey: 'user_id',
    relatedKey: 'id',
  })
  public users: ManyToMany<typeof User>
}

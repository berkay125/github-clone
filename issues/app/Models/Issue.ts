import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Comment from 'App/Models/Comment'
import Project from 'App/Models/Project'
import Tag from "App/Models/Tag";

export default class Issue extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public title: string
  @column()
  public description: string
  @column()
  public project_id: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasMany(() => Comment, {
    localKey: 'id',
    foreignKey: 'issue_id',
  })
  public comments: HasMany<typeof Comment>

  @belongsTo(() => Project, {
    localKey: 'id',
    foreignKey: 'project_id',
  })
  public author: BelongsTo<typeof Project>

  @manyToMany(() => Tag, {
    pivotTable: 'issues_tags',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'issue_id',
    pivotRelatedForeignKey: 'tag_id',
  })
  public tags: ManyToMany<typeof Tag>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

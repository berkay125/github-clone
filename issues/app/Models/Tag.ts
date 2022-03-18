import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'

import Issue from 'App/Models/Issue'

export default class Tag extends BaseModel {
  @column()
  public id: number

  @manyToMany(() => Issue, {
    pivotTable: 'issues_tags',
    relatedKey: 'id',
    localKey: 'id',
    pivotForeignKey: 'tag_id',
    pivotRelatedForeignKey: 'issue_id',
  })
  public issues: ManyToMany<typeof Issue>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

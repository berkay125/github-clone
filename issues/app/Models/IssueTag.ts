import { BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Tag from 'App/Models/Tag'
import Issue from 'App/Models/Issue'

export default class IssueTag extends BaseModel {
  @column()
  public tag_id: number
  @column()
  public issue_id: number

  @manyToMany(() => Issue, {
    localKey: 'issue_id',
    relatedKey: 'id',
  })
  public issue: ManyToMany<typeof Issue>

  @manyToMany(() => Tag, {
    localKey: 'tag_id',
    relatedKey: 'id',
  })
  public tag: ManyToMany<typeof Tag>
}

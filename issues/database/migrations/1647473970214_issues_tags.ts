import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IssuesTags extends BaseSchema {
  protected tableName = 'issues_tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('tag_id').unsigned().references('tag.id')
      table.integer('issue_id').unsigned().references('issue.id')
    })
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

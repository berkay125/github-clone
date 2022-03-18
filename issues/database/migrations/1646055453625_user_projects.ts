import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserProjects extends BaseSchema {
  protected tableName = 'user_projects'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').references('users.id').unsigned().notNullable()
      table.integer('project_id').references('projects.id').unsigned().notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

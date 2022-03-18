import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('Issue_id')
        .unsigned()
        .references('issue.id')
        .onDelete('CASCADE')
      table
        .integer('User_id')
        .unsigned()
        .references('user.id')
        .onDelete('CASCADE')
      table
        .integer('Project_id')
        .unsigned()
        .references('project.id')
        .onDelete('CASCADE')

      table.string('title')
      table.string('description')

      table.boolean('Notification_on')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

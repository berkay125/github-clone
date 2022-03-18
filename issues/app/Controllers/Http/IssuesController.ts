import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Issue from 'App/Models/Issue'
import IssueValidator from 'App/Validators/IssueValidator'
import Tag from 'App/Models/Tag'

export default class IssuesController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(IssueValidator)
    const issues = await Issue.create(payload)
    await issues.save()
    const tag = request.input('tags')
    await issues.related('author')
    if (tag && tag.length > 0) {
      await issues.related('tags').sync(tag)
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const payload = await request.validate(IssueValidator)
    const issues = await Issue.findOrFail(params.id)
    issues.merge(payload)
    await issues.save()
    const tag = request.input('tags')
    await issues.related('author')
    if (tag && tag.length > 0) {
      await issues.related('tags').sync(tag)
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const issue = await Issue.findOrFail(params.id)
    await issue.delete()
  }
}

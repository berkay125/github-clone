import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CommentValidator from 'App/Validators/CommentValidator'
import Comment from 'App/Models/Comment'

export default class CommentsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, auth }: HttpContextContract) {
    const payload = await request.validate(CommentValidator)
    payload.user_id = auth.user?.id
    payload.issue_id = request.param('issue_id')
    const comment = await Comment.create(payload)
    await comment.related('issue')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ params, request }: HttpContextContract) {
    const payload = await request.validate(CommentValidator)
    const comment = await Comment.findOrFail(params.id)
    comment.merge(payload)
    await comment.save()
    await comment.related('issue')
  }

  public async destroy({ params }: HttpContextContract) {
    const comment = await Comment.findOrFail(params.id)
    await comment.delete()
  }
}

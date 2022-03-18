import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProjectValidator from 'App/Validators/ProjectValidator'
import Project from 'App/Models/Project'
import Issue from 'App/Models/Issue'
import {res} from "pino-std-serializers";


export default class ProjectsController {
  public async index({ request, response }: HttpContextContract) {
    return response.json(request.all())
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(ProjectValidator)
    payload.user_id = auth.user?.id
    const project = new Project()
    project.fill(payload)
    const projectUsers = request.input('project_users')
    await project.save()

    if (projectUsers && projectUsers.length > 0) {
      await project.related('users').sync(projectUsers)
    }
    await project.related('users').sync([auth.user?.id])
return response.json(projectUsers)
  }

  public async show({ params, response }: HttpContextContract) {
    let id = params['id']

    const issues = await Issue.query().where('project_id', id).first()

    response.json(issues)
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response, auth }: HttpContextContract) {
    const payload = await request.validate(ProjectValidator)
    const project = await Project.findOrFail(params.id)
    project.merge(payload)
    await project.save()
    const projectUsers = request.input('projectUsers')
    if (projectUsers && projectUsers.length > 0) {
      projectUsers.push(auth.user?.id)
      await project.related('users').sync(projectUsers)
    }else {
      await project.related('users').sync([auth.user?.id])
    }

    return response.json(projectUsers)
  }
  public async destroy({ params }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)
    await project.delete()
  }
}

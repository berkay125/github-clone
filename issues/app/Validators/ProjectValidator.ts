import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProjectValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    description: schema.string({ trim: true }, [rules.minLength(50)]),
    boardName: schema.string({ trim: true }, [rules.maxLength(256)]),
    user_id: schema.number.optional(),
    project_users: schema.array.optional().members(schema.number()),
  })


  public messages = {
    description: 'Minimum 50 karakter girmeniz gerekiyor.',
    boardName: 'Maksimimum 256 karakter yazılabilir',
  }
}

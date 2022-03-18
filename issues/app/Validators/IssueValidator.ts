import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IssueValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    description: schema.string({ trim: true }, [rules.minLength(50)]),
    title: schema.string({ trim: true }, [rules.maxLength(256)]),
    project_id: schema.number([rules.required()]),
    tags: schema.array.optional().members(schema.number()),
  })

  public messages = {
    description: 'Minimum 50 karakter girmeniz gerekiyor.',
    title: 'Maksimimum 256 karakter yazılabilir',
    project_id: 'Lütfen project id giriniz',
  }
}

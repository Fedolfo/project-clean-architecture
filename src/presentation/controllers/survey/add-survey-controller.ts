import { badRequest, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation, AddSurvey } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  private readonly validation: Validation

  private readonly addSurvey: AddSurvey

  constructor(validation: Validation, addSurvey: AddSurvey) {
    this.validation = validation
    this.addSurvey = addSurvey
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { question, answers } = httpRequest.body

      await this.addSurvey.add({
        question,
        answers
      })

      return await new Promise(resolve => resolve(
        {
          body: {
            question: 'any_question',
            answers: [
              {
                image: 'any_image',
                answer: 'any_answer'
              }
            ]
          },
          statusCode: 204
        }
      ))
    } catch (error) {
      return serverError(error)
    }
  }
}

import { Controller } from '../../../../presentation/protocols'
import { MakeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey-controller'
import { MakeAddSurveyValidation } from './add-survey-validation-factory'
import { MakeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-account-factory'

export const MakeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(MakeAddSurveyValidation(), MakeDbAddSurvey())
  return MakeLogControllerDecorator(addSurveyController)
}

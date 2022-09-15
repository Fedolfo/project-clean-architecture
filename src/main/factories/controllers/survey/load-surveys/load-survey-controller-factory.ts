import { Controller } from '../../../../../presentation/protocols'
import { MakeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { MakeDbLoadSurveys } from '../../../usecases/survey/load-surveys/db-load-surveys'

export const MakeLoadSurveysController = (): Controller => {
  const loadSurveyController = new LoadSurveysController(MakeDbLoadSurveys())
  return MakeLogControllerDecorator(loadSurveyController)
}

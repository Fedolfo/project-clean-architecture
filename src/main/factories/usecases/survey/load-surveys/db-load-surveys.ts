import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/db-load-surveys'
import { LoadSurveys } from '../../../../../domain/usecases/loadSurveys'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const MakeDbLoadSurveys = (): LoadSurveys => {
  const accountMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(accountMongoRepository)
}

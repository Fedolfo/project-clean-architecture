import { DbAddSurvey } from '../../../../../data/usecases/add-survey/db-add-survey'
import { AddSurvey } from '../../../../../domain/usecases/addSurvey'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const MakeDbAddSurvey = (): AddSurvey => {
  const accountMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(accountMongoRepository)
}

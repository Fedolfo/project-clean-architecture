import { DbAddSurvey } from './db-add-survey'
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'

const makeAddSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ]
})

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (acountData: AddSurveyModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

interface SutTypes {
  sut: DbAddSurvey
  addSurveyRepository: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepository = makeAddSurveyRepository()

  const sut = new DbAddSurvey(addSurveyRepository)

  return {
    sut,
    addSurveyRepository
  }
}

describe('DbAddSurvey Usecase', () => {
  it('Should call AddSurveyRepository with correct values ', async () => {
    const { sut, addSurveyRepository } = makeSut()

    const addSpy = jest.spyOn(addSurveyRepository, 'add')

    await sut.add(makeAddSurveyData())

    expect(addSpy).toHaveBeenCalledWith(makeAddSurveyData())
  })
})

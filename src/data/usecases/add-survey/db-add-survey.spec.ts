import { DbAddSurvey } from './db-add-survey'
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'
import MockDate from 'mockdate'

const makeAddSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  date: new Date()
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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call AddSurveyRepository with correct values ', async () => {
    const { sut, addSurveyRepository } = makeSut()

    const addSpy = jest.spyOn(addSurveyRepository, 'add')

    await sut.add(makeAddSurveyData())

    expect(addSpy).toHaveBeenCalledWith(makeAddSurveyData())
  })

  it('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepository } = makeSut()

    jest.spyOn(addSurveyRepository, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(makeAddSurveyData())
    await expect(promise).rejects.toThrow()
  })
})

import { Decrypter } from '../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

const makeFakeAccount = (): AccountModel => ({
  _id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'hashed_password'
})

const makeDecrypter = (): Decrypter => {
  return new class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string | null> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
}

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  return new class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?:string): Promise<AccountModel | null> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub} = makeSut()
    const descryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(descryptSpy).toHaveBeenCalledWith('any_token')
   })

   it('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub} = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
   })

   it('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const dLoadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(dLoadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
   })

   it('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub} = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockResolvedValueOnce(new Promise(resolve => resolve(null)))

    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
   })

   it('Should return an account on success', async () => {
    const { sut} = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
   })

   it('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()

    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })


 })
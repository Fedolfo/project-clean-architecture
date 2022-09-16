import { Authentication, AuthenticationModel, HashComparer, Encrypter, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from './db-add-account-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  private readonly hashComparer: HashComparer

  private readonly encrypter: Encrypter

  private readonly updateAcessTokenRepository: UpdateAccessTokenRepository

  constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer, encrypter: Encrypter, updateAcessTokenRepository: UpdateAccessTokenRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.encrypter = encrypter
    this.updateAcessTokenRepository = updateAcessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account._id)
        await this.updateAcessTokenRepository.updateAccessToken(account._id, accessToken)
        return accessToken
      }
    }

    return null
  }
}

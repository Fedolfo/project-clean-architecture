import { Authentication, AuthenticationModel, HashComparer, TokenGenerator, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from './db-add-account-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  private readonly hashComparer: HashComparer

  private readonly tokenGenerator: TokenGenerator

  private readonly updateAcessTokenRepository: UpdateAccessTokenRepository

  constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer, tokenGenerator: TokenGenerator, updateAcessTokenRepository: UpdateAccessTokenRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAcessTokenRepository = updateAcessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAcessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}

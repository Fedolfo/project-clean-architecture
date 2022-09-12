import { LoadAccountByToken } from "../../../domain/usecases/loadAccountByToken";
import { Decrypter } from "../../protocols/criptography/decrypter";
import { LoadAccountByTokenRepository } from "../../protocols/db/account/load-account-by-token-repository";
import { AccountModel } from "../add-account/db-add-account-protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  private readonly decrypter: Decrypter

  private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository

  constructor(decrypter: Decrypter, loadAccountByTokenRepository: LoadAccountByTokenRepository) {
    this.decrypter = decrypter
    this.loadAccountByTokenRepository = loadAccountByTokenRepository
  }

  async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const accessTokenDecrypter = await this.decrypter.decrypt(accessToken)
    if (accessTokenDecrypter) {
     const account =  await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if(account) {
        return account
      }
    }
    return null
  };
}
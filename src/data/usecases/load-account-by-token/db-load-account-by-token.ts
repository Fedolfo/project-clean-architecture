import { LoadAccountByToken } from "../../../domain/usecases/loadAccountByToken";
import { Decrypter } from "../../protocols/criptography/decrypter";
import { AccountModel } from "../add-account/db-add-account-protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  private readonly decrypter: Decrypter

  constructor(decrypter: Decrypter) {
    this.decrypter = decrypter
  }

  async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    await this.decrypter.decrypt(accessToken)
    return null
  };
}
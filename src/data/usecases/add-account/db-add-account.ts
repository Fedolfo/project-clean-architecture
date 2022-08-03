import { AccountModel, AddAccount, addAccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypt: Encrypter

  constructor(encrypter: Encrypter) {
    this.encrypt = encrypter
  }

  async add(account: addAccountModel): Promise<AccountModel> {
    await this.encrypt.encrypt(account.password)
    return await new Promise(resolve => resolve({
      id: 'string',
      name: 'string',
      email: 'string',
      password: 'any_password'
    }))
  }
}

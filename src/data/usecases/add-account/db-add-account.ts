import { AccountModel } from '../../../domain/models/account'
import { AddAccount, addAccountModel } from '../../../domain/usecases/addAccount'
import { Encrypter } from '../../protocols/encrypter'

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

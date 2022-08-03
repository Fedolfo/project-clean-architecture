import { AccountModel, AddAccount, addAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypt: Encrypter

  private readonly addAccountRepository: AddAccountRepository
  constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypt = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add(accountData: addAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypt.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return await new Promise(resolve => resolve({
      id: 'string',
      name: 'string',
      email: 'string',
      password: 'any_password'
    }))
  }
}

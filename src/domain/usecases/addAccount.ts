import { AccountModel } from '../models/account'

export interface addAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (acount: addAccountModel) => Promise<AccountModel | null>
}

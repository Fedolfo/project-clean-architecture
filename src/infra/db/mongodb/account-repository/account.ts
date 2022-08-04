import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { addAccountModel } from '../../../../domain/usecases/addAccount'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(acountData: addAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(acountData)
    const account = result.ops[0]
    const { _id, ...accountWithOutId } = account
    return Object.assign({}, accountWithOutId, { id: _id })
  }
}

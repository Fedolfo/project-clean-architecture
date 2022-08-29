import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { AccountModel } from '../../../../domain/models/account'
import { addAccountModel } from '../../../../domain/usecases/addAccount'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add(accountData: addAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const { insertedId, ...rest } = result
    return Object.assign({}, rest, { id: insertedId }) as unknown as AccountModel
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account as unknown as AccountModel
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: id },
      {
        $set: {
          accessToken: token
        }
      }
    )
  };
}

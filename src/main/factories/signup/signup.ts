import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../../presentation/controllers/signup/signUp'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { MakeSignUpValidation } from './signup-validation'

export const MakeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, MakeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}

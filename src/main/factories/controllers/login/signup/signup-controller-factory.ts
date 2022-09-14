import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { MakeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { MakeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { MakeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { MakeSignUpValidation } from './signup-validation-factory'

export const MakeSignUpController = (): Controller => {
  const signUpController = new SignUpController(MakeDbAddAccount(), MakeSignUpValidation(), MakeDbAuthentication())
  return MakeLogControllerDecorator(signUpController)
}

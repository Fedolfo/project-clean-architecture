import { MakeLoginValidation } from './login-validation-factory'
import { LoginController } from '../../../../../presentation/controllers/login/login/login-controller'
import { Controller } from '../../../../../presentation/protocols'
import { MakeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { MakeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const MakeLoginController = (): Controller => {
  const loginController = new LoginController(MakeDbAuthentication(), MakeLoginValidation())
  return MakeLogControllerDecorator(loginController)
}

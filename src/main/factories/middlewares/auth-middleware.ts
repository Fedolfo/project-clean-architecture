import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { Middleware } from '../../../presentation/protocols'
import { MakeDbLoadAccountByToken } from '../usecases/account/load-account-by-token.ts/db-load-account-by-token-factory'

export const MakeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(MakeDbLoadAccountByToken(), role)
}

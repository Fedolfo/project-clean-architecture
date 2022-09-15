import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { MakeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export const auth = adaptMiddleware(MakeAuthMiddleware())

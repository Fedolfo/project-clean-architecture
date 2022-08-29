/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { MakeSignUpController } from '../factories/signup/signup-factory'
import { MakeLoginController } from '../factories/login/login-factory'
export default (router: Router): void => {
  router.post('/signup', adaptRoute(MakeSignUpController()))
  router.post('/login', adaptRoute(MakeLoginController()))
}

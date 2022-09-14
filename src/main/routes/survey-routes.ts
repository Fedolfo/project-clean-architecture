/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { MakeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { MakeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(MakeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(MakeAddSurveyController()))
}

import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 204 on surveys', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2',
              image: 'http://image-name.com'
            }
          ]
        })
        .expect(204)
    })
  })
})

import { SignUpController } from './signUp'

describe('signUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        email: 'email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  it('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        name: 'my_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })
})

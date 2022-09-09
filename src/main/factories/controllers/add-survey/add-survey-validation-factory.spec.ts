import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { MakeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    MakeAddSurveyValidation()
    const validations: Validation[] = []

    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

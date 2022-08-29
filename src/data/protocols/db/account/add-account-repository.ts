import { addAccountModel } from '../../../../domain/usecases/addAccount'
import { AccountModel } from '../../../../domain/models/account'

export interface AddAccountRepository {
  add: (acountData: addAccountModel) => Promise<AccountModel>
}

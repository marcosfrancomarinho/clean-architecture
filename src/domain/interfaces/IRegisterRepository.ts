import { UserId } from '../entities/UserId';
import { UserRegister } from '../entities/UserRegister';

export interface IRegisterRepository {
  save(userRegister: UserRegister): Promise<UserId>;
}

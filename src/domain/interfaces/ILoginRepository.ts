import { UserLogin } from '../entities/UserLogin';

export interface ILoginRepository {
  list(userLogin: UserLogin): Promise<UserLogin | null>;
}

import { injectable } from 'tsyringe';
import { UserLogin } from '../../domain/entities/UserLogin';
import { ILoginRepository } from '../../domain/interfaces/ILoginRepository';
import { prisma } from './prisma';
import { Email } from '../../domain/valueobject/Email';
import { Password } from '../../domain/valueobject/Password';
import { UserId } from '../../domain/entities/UserId';

@injectable()
export class LoginRepository implements ILoginRepository {
  public async list(userLogin: UserLogin): Promise<UserLogin | null> {
    const email: string = userLogin.getEmail();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const userClient: UserLogin = UserLogin.create(Email.create(email), Password.create(user.password), UserId.create(user.id));
    return userClient;
  }
}

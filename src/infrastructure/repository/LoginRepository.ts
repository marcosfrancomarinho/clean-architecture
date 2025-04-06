import { injectable } from 'tsyringe';
import { UserLogin } from '../../domain/entities/UserLogin';
import { ILoginRepository } from '../../domain/interfaces/ILoginRepository';
import { Email } from '../../domain/valueobject/Email';
import { Password } from '../../domain/valueobject/Password';
import { prisma } from './prisma';
import { UserId } from '../../domain/entities/UserId';

@injectable()
export class LoginRepository implements ILoginRepository {
  public async list(userLogin: UserLogin): Promise<UserLogin | null> {
    const email: string = userLogin.value.email;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const emailClient: Email = Email.create(user.email);
    const passwordClient: Password = Password.create(user.password);
    const userIdClient: UserId = UserId.create(user.id);
    const userClient: UserLogin = UserLogin.create(emailClient, passwordClient, userIdClient);

    return userClient;
  }
}

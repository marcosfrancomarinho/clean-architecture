import { injectable } from 'tsyringe';
import { UserRegister } from '../../domain/entities/UserRegister';
import { IRegisterRepository } from '../../domain/interfaces/IRegisterRepository';
import { prisma } from './prisma';
import { UserId } from '../../domain/entities/UserId';

export type InputUserRegister = {
  name: string;
  email: string;
  password: string;
};

@injectable()
export class RegisterRepository implements IRegisterRepository {
  public async save(userRegister: UserRegister): Promise<UserId> {
    const data: InputUserRegister = {
      name: userRegister.value.name,
      email: userRegister.value.email,
      password: userRegister.value.passoword,
    };
    const { id } = await prisma.user.create({ data });
    return UserId.create(id);
  }
}

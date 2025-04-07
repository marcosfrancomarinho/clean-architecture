import { injectable } from 'tsyringe';
import { GetDatas, UserRegister } from '../../domain/entities/UserRegister';
import { IRegisterRepository } from '../../domain/interfaces/IRegisterRepository';
import { prisma } from './prisma';
import { UserId } from '../../domain/entities/UserId';

@injectable()
export class RegisterRepository implements IRegisterRepository {
  public async save(userRegister: UserRegister): Promise<UserId> {
    const datasUser: GetDatas = userRegister.getDatas();
    const { id } = await prisma.user.create({ data: datasUser });
    const userId: UserId = UserId.create(id);
    return userId;
  }
}

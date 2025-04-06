import { inject, injectable } from 'tsyringe';
import { InputRegisterUserDTO, IRegisterUseCase, OutputRegisterUserDTO } from './IRegisterUseCase';
import { RegisterRepository } from '../../../infrastructure/repository/RegisterRepository';
import { IRegisterRepository } from '../../../domain/interfaces/IRegisterRepository';
import { UserRegister } from '../../../domain/entities/UserRegister';
import { Name } from '../../../domain/valueobject/Name';
import { Email } from '../../../domain/valueobject/Email';
import { Password } from '../../../domain/valueobject/Password';
import { Hasher } from '../../../infrastructure/cryptography/Hasher';
import { IHasher } from '../../../domain/interfaces/IHasher';
import { UserId } from '../../../domain/entities/UserId';

@injectable()
export class RegisterUseCase implements IRegisterUseCase {
  public constructor(@inject(RegisterRepository) private register: IRegisterRepository, @inject(Hasher) private hasher: IHasher) {}
  public async execute(inputRegisterUser: InputRegisterUserDTO): Promise<OutputRegisterUserDTO> {
    const name: Name = Name.create(inputRegisterUser.name);
    const email: Email = Email.create(inputRegisterUser.email);
    const passoword: Password = Password.create(inputRegisterUser.password);
    const userRegister: UserRegister = await UserRegister.create(name, email, passoword, this.hasher);
    const ID: UserId = await this.register.save(userRegister);
    const userId: OutputRegisterUserDTO = { id: ID.value };
    return userId;
  }
}

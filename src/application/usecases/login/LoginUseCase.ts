import { UserLogin } from '../../../domain/entities/UserLogin';
import { Email } from '../../../domain/valueobject/Email';
import { Password } from '../../../domain/valueobject/Password';
import { ILoginUseCase, InputLoginUserDTO, OutputLoginUserDTO } from './ILoginUseCase';
import { LoginRepository } from '../../../infrastructure/repository/LoginRepository';
import { ILoginRepository } from '../../../domain/interfaces/ILoginRepository';
import { Hasher } from '../../../infrastructure/cryptography/Hasher';
import { IHasher } from '../../../domain/interfaces/IHasher';
import { IAuthService } from '../../../domain/interfaces/IAuthService';
import { JwtAuthService } from '../../../infrastructure/authentication/JwtAuthService';
import { Token } from '../../../domain/valueobject/Token';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LoginUseCase implements ILoginUseCase {
  public constructor(
    @inject(LoginRepository) private login: ILoginRepository,
    @inject(Hasher) private hasher: IHasher,
    @inject(JwtAuthService) private authService: IAuthService
  ) {}

  public async execute(inputLoginUser: InputLoginUserDTO): Promise<OutputLoginUserDTO> {
    const email: Email = Email.create(inputLoginUser.email);
    const passoword: Password = Password.create(inputLoginUser.password);

    const userLogin: UserLogin = UserLogin.create(email, passoword);
    const userClient: UserLogin | null = await this.login.list(userLogin);

    if (!userClient) throw new Error('incorrect password or email');

    await userClient.compare(passoword, userClient.passwordEncode, this.hasher);

    const token: Token = this.authService.genereteToken(userClient);
    const tokenClient: OutputLoginUserDTO = { token: token.value };
    return tokenClient;
  }
}

import { IHasher } from '../interfaces/IHasher';
import { Email } from '../valueobject/Email';
import { Password } from '../valueobject/Password';
import { UserId } from './UserId';

export class UserLogin {
  private constructor(private email: Email, private password: Password, private userId?: UserId) {}

  public static create(email: Email, password: Password, userId?: UserId): UserLogin {
    return new UserLogin(email, password, userId);
  }

  public async compare(passoword: Password, encrypt: Password, hasher: IHasher): Promise<void> {
    const checking: boolean = await hasher.compare(passoword, encrypt);
    if (!checking) throw new Error('incorrect password or email');
  }
  public get passwordEncode(): Password {
    return this.password;
  }
  public get value() {
    return {
      email: this.email.value,
      password: this.password.value,
      userId: this.userId?.value,
    };
  }
}

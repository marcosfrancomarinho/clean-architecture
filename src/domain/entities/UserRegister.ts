import { IHasher } from '../interfaces/IHasher';
import { Email } from '../valueobject/Email';
import { Name } from '../valueobject/Name';
import { Password } from '../valueobject/Password';

export class UserRegister {
  private constructor(private name: Name, private email: Email, private password: Password) {}

  public static async create(name: Name, email: Email, password: Password, hasher: IHasher): Promise<UserRegister> {
    password = await hasher.encrypt(password);
    return new UserRegister(name, email, password);
  }
  public static async with(name: Name, email: Email, password: Password): Promise<UserRegister> {
    return new UserRegister(name, email, password);
  }
  public get value() {
    return {
      name: this.name.value,
      email: this.email.value,
      passoword: this.password.value,
    };
  }
}

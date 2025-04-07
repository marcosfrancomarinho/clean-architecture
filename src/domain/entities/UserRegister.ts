import { IHasher } from '../interfaces/IHasher';
import { Email } from '../valueobject/Email';
import { Name } from '../valueobject/Name';
import { Password } from '../valueobject/Password';

export type GetDatas = {
  name: string;
  email: string;
  password: string;
};

export class UserRegister {
  private constructor(private name: Name, private email: Email, private password: Password) {}

  public static async create(name: Name, email: Email, password: Password, hasher: IHasher): Promise<UserRegister> {
    password = await hasher.encrypt(password);
    return new UserRegister(name, email, password);
  }

  public getDatas(): GetDatas {
    return {
      name: this.name.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
    };
  }
}

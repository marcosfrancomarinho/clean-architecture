import { Password } from '../valueobject/Password';

export interface IHasher {
  encrypt(passoword: Password): Promise<Password>;
  compare(passoword: Password, encrypt:Password): Promise<boolean>;
}

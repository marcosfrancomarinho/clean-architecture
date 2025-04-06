import { injectable } from 'tsyringe';
import { IHasher } from '../../domain/interfaces/IHasher';
import { Password } from '../../domain/valueobject/Password';
import bcrypt from 'bcrypt';

@injectable()
export class Hasher implements IHasher {
  public async compare(passoword: Password, encrypt: Password): Promise<boolean> {
    const checking: boolean = await bcrypt.compare(passoword.value, encrypt.value);
    return checking;
  }
  public async encrypt(passoword: Password): Promise<Password> {
    const salt: number = 10;
    const hash: string = await bcrypt.hash(passoword.value, salt);
    return Password.create(hash);
  }
}

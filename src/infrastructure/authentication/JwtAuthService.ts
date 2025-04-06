import { UserLogin } from '../../domain/entities/UserLogin';
import { IAuthService, Payload } from '../../domain/interfaces/IAuthService';
import { Key } from '../../domain/valueobject/Key';
import { Token } from '../../domain/valueobject/Token';
import jwt from 'jsonwebtoken';

export class JwtAuthService implements IAuthService {

  public genereteToken(userLogin: UserLogin): Token {
    const key: Key = Key.create(process.env);
    const hash: string = jwt.sign({ userId: userLogin.value.userId }, key.value, { algorithm: 'HS256' });
    return Token.create(hash);
  }
  
  public verifyToken(hash: string): Payload {
    const key: Key = Key.create(process.env);
    const token: Token = Token.create(hash);
    const payload = jwt.verify(token.value, key.value) as Payload;
    return payload;
  }
}

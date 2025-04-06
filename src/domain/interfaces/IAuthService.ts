import { UserLogin } from '../entities/UserLogin';
import { Token } from '../valueobject/Token';

export type Payload = { userId: number; iat: number };

export interface IAuthService {
  genereteToken(userLogin: UserLogin): Token;
  verifyToken(token: string): Payload;
}


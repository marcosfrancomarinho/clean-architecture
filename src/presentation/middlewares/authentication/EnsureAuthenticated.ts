import { NextFunction, Request, Response } from 'express';
import { IEnsureAuthenticated } from './IEnsureAuthenticated';
import { inject, injectable } from 'tsyringe';
import { JwtAuthService } from '../../../infrastructure/authentication/JwtAuthService';
import { IAuthService } from '../../../domain/interfaces/IAuthService';

@injectable()
export class EnsureAuthenticated implements IEnsureAuthenticated {
  public constructor(@inject(JwtAuthService) private authService: IAuthService) {}

  public execute(request: Request, response: Response, next: NextFunction): void {
    try {
      const token = request.headers['token'] as string;
      const { userId } = this.authService.verifyToken(token);
      response.locals.userId = userId;
      next();
    } catch (error) {
      const message = { error: (error as Error).message } as { error: string };
      response.status(400).json(message);
    }
  }
}

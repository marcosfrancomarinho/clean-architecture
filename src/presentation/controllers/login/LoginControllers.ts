import { Request, Response, NextFunction } from 'express';
import { ILoginControllers } from './ILoginControllers';
import { inject, injectable } from 'tsyringe';
import { LoginUseCase } from '../../../application/usecases/login/LoginUseCase';
import { ILoginUseCase } from '../../../application/usecases/login/ILoginUseCase';

@injectable()
export class LoginControllers implements ILoginControllers {
  public constructor(@inject(LoginUseCase) private loginUser: ILoginUseCase) {}

  public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = request.body;
      const { token } = await this.loginUser.execute({ email, password });
      response.status(201).setHeader('token', token).json({ email, message: 'user login success' });
    } catch (error) {
      next(error);
    }
  }
}

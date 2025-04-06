import { Request, Response, NextFunction } from 'express';
import { IRegisterControllers } from './IRegisterControllers';
import { inject, injectable } from 'tsyringe';
import { RegisterUseCase } from '../../../application/usecases/register/RegisterUseCase';
import { IRegisterUseCase, OutputRegisterUserDTO } from '../../../application/usecases/register/IRegisterUseCase';

@injectable()
export class RegisterControllers implements IRegisterControllers {
  public constructor(@inject(RegisterUseCase) private registerUser: IRegisterUseCase) {}

  public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = request.body;
      const userClient: OutputRegisterUserDTO = await this.registerUser.execute({ name, email, password });
      response.status(201).json({ id: userClient.id, message: 'user create success' });
    } catch (error) {
      next(error);
    }
  }
}

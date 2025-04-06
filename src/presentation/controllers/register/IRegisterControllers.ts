import { NextFunction, Request, Response } from 'express';

export interface IRegisterControllers {
  execute(request: Request, response: Response, next: NextFunction): Promise<void>;
}

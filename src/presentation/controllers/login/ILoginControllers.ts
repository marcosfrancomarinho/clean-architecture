import { NextFunction, Request, Response } from 'express';

export interface ILoginControllers {
  execute(request: Request, response: Response, next: NextFunction): Promise<void>;
}

import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export class HandleError {
  public static catch(error: any, request: Request, response: Response, next: NextFunction): void {
    let status: number = 400;
    let message: string = 'Internal server error';

    if (error instanceof Error) {
      message = error.message;
      status = 400;
    }
    if (error.code === 'P2002') {
      message = '/email duplicate / email already registered';
      status = 409;
    }
    if (error.code === 'P2021') {
      message = '/database/ database connection failure';
      status = 500;
    }
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      message = '/database/ unknown Prisma error.';
      status = 500;
    }
    if (error instanceof Prisma.PrismaClientInitializationError) {
      message = '/database/  failed to connect to database.';
      status = 500;
    }
    if (error instanceof Prisma.PrismaClientRustPanicError) {
      message = '/database/  prism panicked.';
      status = 500;
    }
    response.status(status).json({ error: message });
  }
}

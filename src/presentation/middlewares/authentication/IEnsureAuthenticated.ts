import { NextFunction, Request, Response } from "express";

export  interface IEnsureAuthenticated{
    execute(request:Request, response:Response, next:NextFunction):void
}
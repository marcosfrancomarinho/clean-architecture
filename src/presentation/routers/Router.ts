import { Express } from 'express';
import { container } from 'tsyringe';
import { RegisterControllers } from '../controllers/register/RegisterControllers';
import { IRegisterControllers } from '../controllers/register/IRegisterControllers';
import { ILoginControllers } from '../controllers/login/ILoginControllers';
import { LoginControllers } from '../controllers/login/LoginControllers';
import { IEnsureAuthenticated } from '../middlewares/authentication/IEnsureAuthenticated';
import { EnsureAuthenticated } from '../middlewares/authentication/EnsureAuthenticated';

export class Router {
  public static loading(app: Express): void {
    const register: IRegisterControllers = container.resolve(RegisterControllers);
    const login: ILoginControllers = container.resolve(LoginControllers);
    const authenticate: IEnsureAuthenticated = container.resolve(EnsureAuthenticated);

    app.post('/register', register.execute.bind(register));
    app.post('/login', login.execute.bind(login));
  }
}

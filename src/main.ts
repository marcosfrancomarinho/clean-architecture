import 'reflect-metadata';
import express from 'express';
import { Router } from './presentation/routers/Router';
import { HandleError } from './presentation/middlewares/error/HandleError';
import cors, { CorsOptions } from 'cors';

(function main(): void {
  const app = express();
  const port: number = Number(process.env.PORT ?? '8080');
  const options: CorsOptions = {
    exposedHeaders: ['token'],
    allowedHeaders: ['Content-Type', 'token', 'Authorization'],
    origin: ['*'],
    methods: ['POST'],
  };
  
  app.use(express.json());
  app.use(cors(options));
  Router.loading(app);
  app.use(HandleError.catch);

  app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
  });
})();

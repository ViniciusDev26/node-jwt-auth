require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import { createConnection } from 'typeorm';
import { router } from './Routes';

const app = express();

createConnection().then(() => {
  app.use(express.json());
  app.use(helmet());
  app.use(router);
}).catch(err => {
  console.log(err);
})

export { app };

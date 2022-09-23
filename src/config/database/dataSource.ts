import { DataSource } from 'typeorm';
import entities from '../../entities';
import * as dotenv from 'dotenv';

import migrations from './migrations';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TypeormDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: false,
  logging: true,
  entities,
  migrations,
});

TypeormDataSource.initialize()
  .then(() => {
    console.log(process.env.DB_NAME);
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

import { DataSource } from 'typeorm';

import { entities } from '@/entities';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TypeormDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || 'issuixv2',
  password: process.env.POSTGRES_PASSWORD || 'issuixv2',
  database: process.env.POSTGRES_DB_NAME || 'issuixv2',
  synchronize: false,
  migrationsRun: false,
  entities: entities,
});

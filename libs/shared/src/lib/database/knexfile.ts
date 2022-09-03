import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../../../../.env' });
import * as path from 'path';
import { Knex } from 'knex';

const defaultConfig = {
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.join(
      __dirname,
      '../../../../../apps/api/src/database/migrations'
    ),
  },
  seeds: {
    directory: path.join(
      __dirname,
      '../../../../../apps/api/src/database/seeds'
    ),
  },
};

const getConnectionStringConfig = (config: Knex.Config): Knex.Config => ({
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
  },
  ...config,
});

export const knexConfig = {
  testing: getConnectionStringConfig(defaultConfig),
};

export default knexConfig;

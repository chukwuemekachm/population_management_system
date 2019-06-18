import 'dotenv/config';

const database = {
  test: {
    use_env_variable:  'DATABASE_URL_TEST',
    dialect:  'postgres',
  },
  development: {
    use_env_variable: 'DATABASE_URL_DEV',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
};
const env = process.env.NODE_ENV || 'development';

export default process.env[database[env].use_env_variable];

import { ConfigModuleOptions } from '@nestjs/config';

const envVars = () => {
  return {
    app: {
      host: process.env.HOST || 'localhost',
      port: process.env.PORT,
      serviceName: process.env.SERVICE_NAME,
      origin: process.env.ORIGIN,
    },
    db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
  };
};

const envConfig = () => {
  const options: ConfigModuleOptions = {
    isGlobal: true,
    cache: true, // values from the process.env object will be cached in the memory.
    load: [envVars],
  };

  // only for local development, in other environments export env variables
  if (process.env.NODE_ENV === 'local') {
    options.envFilePath = [`.env.${process.env.NODE_ENV}`];
  }

  return options;
};

export { envConfig };

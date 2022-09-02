import {
  INestApplication,
  RequestMethod,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger';

export const configureApp = (app: INestApplication, config: ConfigService) => {
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.enableCors({ methods: ['GET'], origin: [config.get('app.origin')] });
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableVersioning({ type: VersioningType.URI });

  // Display swagger only in local and dev env
  if (['dev', 'local'].includes(process.env.NODE_ENV)) setupSwagger(app);
};

export default configureApp;

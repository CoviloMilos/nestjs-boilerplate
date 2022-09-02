import {
  INestApplication,
  RequestMethod,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const configureApp = (app: INestApplication, config: ConfigService) => {
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.enableCors({ methods: ['GET'], origin: [config.get('app.origin')] });
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableVersioning({ type: VersioningType.URI });
};

export default configureApp;

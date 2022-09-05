import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CORRELATION_ID } from '../utils/constants';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = uuidv4();

    req.headers[CORRELATION_ID] = correlationId;

    next();
  }
}

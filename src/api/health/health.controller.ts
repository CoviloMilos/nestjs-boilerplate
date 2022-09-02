import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  // TODO: This could be improved by pinging database
  @Get('/')
  async checkHealth(): Promise<any> {
    return { status: 'up' };
  }
}

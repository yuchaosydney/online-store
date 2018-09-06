import { HttpCallsService } from './http-calls/http-calls.service';
import { AppConfigService } from './app-config/app-config-service.service';

export const services: any[] = [HttpCallsService, AppConfigService];

export * from './http-calls/http-calls.service';
export * from './app-config/app-config-service.service';

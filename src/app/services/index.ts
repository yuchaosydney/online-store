import { AuthService } from './auth/auth.service';
import { FileService } from './file/file.service';
import { ProductsService } from './product/products.service';
import { AppConfigService } from './app-config/app-config-service.service';
import { HttpCallsService } from './http-calls/http-calls.service';

export const services: any[] = [AuthService, FileService, ProductsService, AppConfigService, HttpCallsService];

export * from './auth/auth.service';
export * from './file/file.service';
export * from './product/products.service';
export * from './app-config/app-config-service.service';
export * from './http-calls/http-calls.service';

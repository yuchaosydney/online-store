import { AuthService } from './auth/auth.service';
import { FileService } from './file/file.service';
import { ProductsService } from './product/products.service';

export const services: any[] = [AuthService, FileService, ProductsService];

export * from './auth/auth.service';
export * from './file/file.service';
export * from './product/products.service';

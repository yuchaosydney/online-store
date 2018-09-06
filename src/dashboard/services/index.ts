import { FileService } from './file/file.service';
import { ProductsService } from './product/products.service';

export const services: any[] = [FileService, ProductsService];

export * from './file/file.service';
export * from './product/products.service';

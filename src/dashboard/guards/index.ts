import { ProductsGuard } from './products.guard';
import { AuthGuard } from './auth.guard';

export const guards: any[] = [ProductsGuard, AuthGuard];

export * from './products.guard';
export * from './auth.guard';

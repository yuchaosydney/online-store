import { TestBed, inject } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpCallsService } from '../http-calls/http-calls.service';
import { HttpModule } from '@angular/http';

describe('ProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ProductsService, HttpCallsService]
    });
  });

  it('should be created', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));
});

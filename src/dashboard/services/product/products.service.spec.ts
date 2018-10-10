import { TestBed, inject } from '@angular/core/testing';

import { ProductsService } from './products.service';

import { HttpModule } from '@angular/http';

import * as fromPublicService from '../../../services';

describe('ProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        fromPublicService.HttpCallsService,
        ProductsService,
      ]
    });
  });

  it('should be created', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));
});

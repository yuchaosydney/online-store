import { TestBed, inject } from '@angular/core/testing';

import { HttpCallsService } from './http-calls.service';
import { HttpModule } from '@angular/http';

describe('HttpCallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [HttpCallsService]
    });
  });

  it('should be created', inject([HttpCallsService], (service: HttpCallsService) => {
    expect(service).toBeTruthy();
  }));
});

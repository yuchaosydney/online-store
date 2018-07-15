import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { HttpCallsService } from '../http-calls/http-calls.service';
import { HttpModule } from '@angular/http';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AuthService, HttpCallsService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});

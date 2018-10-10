import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { HttpModule } from '@angular/http';

import * as fromPublicService from '../../../services';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ...fromPublicService.services,
        AuthService
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});

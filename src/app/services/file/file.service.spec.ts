import { TestBed, inject } from '@angular/core/testing';

import { FileService } from './file.service';

import { HttpCallsService } from '../http-calls/http-calls.service';
import { HttpModule } from '@angular/http';

describe('FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [FileService, HttpCallsService]
    });
  });

  it('should be created', inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));
});

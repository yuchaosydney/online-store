import { TestBed, inject } from '@angular/core/testing';

import { FileService } from './file.service';

import { HttpModule } from '@angular/http';

import * as fromPublicService from '../../../services';

describe('FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ...fromPublicService.services,
        FileService
      ]
    });
  });

  it('should be created', inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));
});

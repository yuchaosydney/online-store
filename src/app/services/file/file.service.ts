import { Injectable } from '@angular/core';
import { HttpCallsService } from '../http-calls/http-calls.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { mergeAnalyzedFiles } from '@angular/compiler';

@Injectable()
export class FileService {

  constructor(private httpCallsService: HttpCallsService) { }

  uploadFile(file: File): Observable<any> {
    return this.httpCallsService.postRequest(`file/upload`, file);
  }

  uploadFiles(files: File[]): Observable<any> {
    return forkJoin(files.map((file: File) => {
      const formData: any = new FormData();
      formData.append('file', file);
      return this.httpCallsService.postFormDataRequest(`file/upload`, formData);
    }));
  }

}

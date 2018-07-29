import { Injectable } from '@angular/core';
import { HttpCallsService } from '../http-calls/http-calls.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class FileService {

  private bucket;
  private bucketName;

  constructor(private httpCallsService: HttpCallsService) {
    this.bucketName = 'phonecase-store-app-files';
  }

  uploadFile(file: File): Observable<any> {
    return this.httpCallsService.postRequest(`file/upload`, file);
  }

  uploadFiles(files: File[]): Observable<any> {

    return forkJoin(files.map((file: File) => {

      const bucket = new S3({
        accessKeyId: 'AKIAJ3KKUGCEORP2KXHA',
        secretAccessKey: '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',
        region: 'ap-southeast-2'
      });

      const params = {
        Bucket: this.bucketName,
        Key: file.name,
        Body: file,
        ACL: 'public-read'
      };

      return Observable.create(observer => {
        bucket.upload(params, function (err, data) {
          if (err) {
            console.log(`There was an error uploading your file: ${err}`);
            observer.error(`There was an error uploading your file: ${err}`);
          }
          observer.next(data.Location);
          observer.complete();
        });
      });

    }));
  }

}

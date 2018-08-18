import { Injectable } from '@angular/core';
import { HttpCallsService } from '../http-calls/http-calls.service';
import { Observable } from 'rxjs/Observable';

import * as S3 from 'aws-sdk/clients/s3';
import { concat } from '../../../../node_modules/rxjs/observable/concat';

@Injectable()
export class FileService {

  private bucketName;

  constructor(private httpCallsService: HttpCallsService) {
    this.bucketName = 'phonecase-store-app-assets';
  }

  uploadFile(file: File): Observable<any> {
    return this.httpCallsService.postRequest(`file/upload`, file);
  }

  uploadFiles(files: File[]): Observable<any> {
console.log('------files-----', files);
    const fileUploadObservablesArray: Observable<any>[] = (
      files.map((file: File) => {

        const bucket = new S3({
          accessKeyId: 'AKIAJ2IEVBO2AJCEI3LQ',
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
              console.error(`There was an error uploading your file: ${err}`);
              observer.error(`There was an error uploading your file: ${err}`);
            }
            observer.next(data.Location);
            observer.complete();
          })
          .on('httpUploadProgress', progress => {
            const progressPercentage: number = progress.loaded * 100 / progress.total;
            observer.next(progressPercentage);
          });
        });
      })
    );

    return concat(...fileUploadObservablesArray);
  }
}

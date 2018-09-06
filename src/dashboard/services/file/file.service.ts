import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import * as fromPublicService from '../../../services';

import * as S3 from 'aws-sdk/clients/s3';
import { concat } from 'rxjs/observable/concat';

import * as fromModel from '../../models/index';

@Injectable()
export class FileService {

  private bucketName;

  constructor(
    private httpCallsService: fromPublicService.HttpCallsService,
    private appConfig: fromPublicService.AppConfigService
  ) {
  }

  uploadFile(file: File): Observable<any> {
    return this.httpCallsService.postRequest(`file/upload`, file);
  }

  uploadFiles(files: fromModel.UploadFile[]): Observable<any> {

    const fileUploadObservablesArray: Observable<any>[] = (
      files.map((file: fromModel.UploadFile) => {

        const bucket = new AWS.S3({
          region: this.appConfig.config.S3.region,
          credentials: {
            accessKeyId: this.appConfig.config.S3.accessKeyId,
            secretAccessKey: this.appConfig.config.S3.secretAccessKey
          }
        });

        const params = {
          Bucket: this.appConfig.config.S3.bucketName,
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
            const progressPercentage: number = progress.total ? progress.loaded * 100 / progress.total : 0;
            file.uploadProgress = progressPercentage;
            observer.next(file);
          });
        });
      })
    );

    return concat(...fileUploadObservablesArray);
  }
}

import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfigService {

  private appConfig;

  constructor(private injector: Injector) { }

  loadAppConfig() {
    const http = this.injector.get(HttpClient);

    return http.get('/assets/app-config.json')
    .toPromise()
    .then(data => {
        this.appConfig = data;
    }).catch(error => {
      console.warn(`Error loading app-config.json, using envrionment file instead: ${error}`);
    });
  }

  get config() {
    return this.appConfig;
  }

}

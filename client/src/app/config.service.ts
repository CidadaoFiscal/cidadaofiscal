import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ConfigService {

  constructor() { }

  getBaseUrl(): string {
    return environment.baseUrl;
  }

}

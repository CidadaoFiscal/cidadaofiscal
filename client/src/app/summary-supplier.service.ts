import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SummarySupplierResponse } from './summary-supplier-response';

@Injectable()
export class SummarySupplierService {

  private serviceUrl = '/api/alepe/summary-supplier.php';
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getSummarySupplier(): Observable<SummarySupplierResponse> {
    return this.http.get<SummarySupplierResponse>(this.configService.getBaseUrl() + this.serviceUrl, {params : {limit: '100'}});
  }
}

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { SummaryExpensesYearResponse } from './summary-expenses-year-response';

@Injectable()
export class SummaryExpensesYearService {

  private serviceUrl = '/api/alepe/summary-expenses-year.php';
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getSummaryExpensesYear(): Observable<SummaryExpensesYearResponse> {
    return this.http.get<SummaryExpensesYearResponse>(this.configService.getBaseUrl() + this.serviceUrl);
  }
}

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { SummaryMemberResponse } from './summary-member-response';


@Injectable()
export class SummaryMemberService {

  private serviceUrl = '/api/alepe/summary-member.php';
  constructor(private http: HttpClient, private configService: ConfigService) {

  }

  getSummaryMember(): Observable<SummaryMemberResponse> {
    return this.http.get<SummaryMemberResponse>(this.configService.getBaseUrl() + this.serviceUrl);
  }
}

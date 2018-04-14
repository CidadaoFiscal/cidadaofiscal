import { ConfigService } from './config.service';
import { DetailResponse } from './detail-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DetailService {

  private detailUrl = '/api/alepe/detail.php';
  constructor(private http: HttpClient, private configService: ConfigService) {

  }

  getDetails (parameters): Observable<DetailResponse> {
    let params = new HttpParams();
    params = (parameters.limit === undefined) ? params : params.append('limit', parameters.limit);

    params = this.appendParameterIfExists(params, parameters, 'memberPoliticalName');
    params = this.appendParameterIfExists(params, parameters, 'memberParty');
    params = this.appendParameterIfExists(params, parameters, 'supplierName');
    params = this.appendParameterIfExists(params, parameters, 'supplierId');
    params = this.appendParameterIfExists(params, parameters, 'expenseValueFrom');
    params = this.appendParameterIfExists(params, parameters, 'expenseValueTo');
    params = this.appendParameterIfExists(params, parameters, 'expenseDateFrom');
    params = this.appendParameterIfExists(params, parameters, 'expenseDateTo');
    return this.http.get<DetailResponse>(this.configService.getBaseUrl() + this.detailUrl, {params : params});
  }

  private appendParameterIfExists(params, parameters, parameterName) {
    return this.isUndefinedOrEmpty(parameters[parameterName]) ?
      params : params.append(parameterName, ('' + parameters[parameterName]).trim());
  }

  private isUndefinedOrEmpty(object) {
    return (object === undefined || object === null || object === '');
  }

}

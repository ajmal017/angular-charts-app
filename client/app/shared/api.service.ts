import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { Logger } from "./logger.service";
import * as Raven from 'raven-js';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private _apiUrl = this._api + '/api/proxy/?';
  public priceHistory = {};

  constructor(
    private _http: Http,
    private _log: Logger,
    @Inject('api-url') private _api: string
  ){}

  public queryAPI(queryString) {
    //this._log['log']('getHistory(queryString)', this._apiUrl + queryString);
    return this._http
      //.get('/assets/api/techan.json')
      .get(this._apiUrl + queryString)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  buildHistoryQuery(ticker: string, from: string, to: string){
    let timeFrom = (new Date(from)).getTime(), timeTo = (new Date(to)).getTime();
    let dateRanges = [];
    while(true){
      if(timeTo - 31104000000 >= timeFrom){
        dateRanges.push({to: this.formatDate(timeTo), from: this.formatDate(timeTo - 31104000000)})
        timeTo -= 31104000000 + 86400000; // - 360 days + 1 day
      } else {
        if(timeTo - timeFrom < 2678400000){ // if less than 1 month difference
          timeFrom -= 2678400000; // otherwise api doesn't respond
        }
        dateRanges.push({to: this.formatDate(timeTo), from: this.formatDate(timeFrom)})
        break;
      }
    }
    let queries = [];
    dateRanges.forEach(range =>{
      let query ='select * from yahoo.finance.historicaldata where symbol = "' +
      ticker + '" and startDate = "' + range.from + '" and endDate = "' + range.to + '"&format=json' +
      '&env=store://datatables.org/alltableswithkeys';
      query = this.encodeURL(query).replace(/%5C%22/g, '%22').substr(3).replace(/format%3D/, 'format=');
      queries.push(query.substr(0, query.length-3).replace(/%26/g, '&').replace(/env%3D/, 'env='));
    });
    return queries;
  }

  formatDate(time){
    let date = new Date(time), d = date.getDate(), m = (date.getMonth() + 1);
    let day = (d > 9) ? '' + d : '0' + d;
    let month = (m > 9) ? '' + m : '0' + m;
    return  date.getFullYear() + '-' + month + '-' + day;
  }

  buildQuoteQuery(ticker: string){
    let query ='select * from yahoo.finance.quotes where symbol in ("' +
    ticker + '")&format=json' +
    '&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=';
    query = this.encodeURL(query).replace(/%5C%22/g, '%22').substr(3).replace(/format%3D/, 'format=');
    return query.substr(0, query.length-3).replace(/%26/g, '&').replace(/env%3D/, 'env=');
  }

  encodeURL(data){
    return encodeURIComponent(JSON.stringify(data));
  }

  private handleError(err: Response) : Observable<Response> {
    let errorMessage = 'Http Response Error :: api.service';
    this._log['error']('Http Response Error: ',err);
    Raven.captureException(err.json().err || errorMessage);
    return Observable.throw(err.json().err || errorMessage);
  }

}

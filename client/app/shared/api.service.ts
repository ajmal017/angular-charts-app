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
  private _apiUrl = 'https://query.yahooapis.com/v1/public/yql?q=';
  public priceHistory = {};

  constructor(
    private _http: Http,
    private _log: Logger,
  ){}

  public getHistory(queryString) {
    this._log['log']('getHistory(queryString)', this._apiUrl + queryString);
    return this._http
      //.get('/assets/api/techan.json')
      .get(this._apiUrl + queryString)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  buildQuery(ticker: string, start: string, end: string){
    let query ='select * from yahoo.finance.historicaldata where symbol = "' +
    ticker + '" and startDate = "' + start + '" and endDate = "' + end + '"&format=json' +
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

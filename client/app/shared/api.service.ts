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
  //private _apiUrl = 'http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=';
  public priceHistory = {};

  constructor(
    private _http: Http,
    private _log: Logger,
  ){}

  public getHistory(stock) {
    this._log['log']('getHistory(stock)', stock);
    return this._http
      .get('/assets/api/techan.json')
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(err: Response) : Observable<Response> {
    let errorMessage = 'Http Response Error :: api.service';
    this._log['error']('Http Response Error: ',err);
    Raven.captureException(err.json().err || errorMessage);
    return Observable.throw(err.json().err || errorMessage);
  }

}

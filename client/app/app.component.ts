import { Component, OnInit } from '@angular/core';


import { ApiService } from './shared/api.service';
import { Logger } from './shared/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.view.css']
})
export class AppComponent implements OnInit {

  constructor(
    private _api: ApiService,
    private _log: Logger
  ){}

  ngOnInit(): void {
    this._api.getHistory('something')
      .subscribe(history => {
        console.log(history);
      });
  }

  encodeURL(data){
    return encodeURIComponent(data);
  }

  getHistory(stock){

  }

}

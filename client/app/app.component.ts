import { Component, OnInit } from '@angular/core';


import { ApiService } from './shared/api.service';
import { Logger } from './shared/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.view.css']
})
export class AppComponent implements OnInit {
  private chartData: any;

  constructor(
    private _api: ApiService,
    private _log: Logger
  ){}

  ngOnInit(): void {
    setTimeout(() => {
    this._api.getHistory('something')
      .subscribe(history => {
        //console.log(history);
        this.chartData = history;
      });
    }, 1000);

  }

  encodeURL(data){
    return encodeURIComponent(data);
  }

  getHistory(stock){

  }

  showData(){
    //console.log(this.chartData)
  }

}

import { Component, OnInit } from '@angular/core';


import { ApiService } from './shared/api.service';
import { Logger } from './shared/logger.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


const now = new Date();

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.view.css']
})
export class AppComponent implements OnInit {
  private chartCollection = [];
  private chartData;
  public startDate =  '2016-01-11';
  public endDate = '2017-01-10';
  public charts: number
  model: NgbDateStruct;
  date: {year: number, month: number};

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }


  constructor(
    private _api: ApiService,
    private _log: Logger
  ){}

  ngOnInit(): void {
    // this.charts = 2;
    // this.addData('GOOGL');
    // this.addData('AMZN');
  }

  addData(ticker){
    let query = this._api.buildQuery(ticker, this.startDate, this.endDate);
    //console.log('ngOnInit(): ', query);
    this._api.getHistory(query)
      .subscribe(res => {
        console.log('ngOnInit(): retrieved ', res);
        let processedData = {id: ticker, values: []};
        for(let i=0; i<res.query.results.quote.length; i++)
          processedData.values[res.query.results.quote.length-i-1] = {date: res.query.results.quote[i].Date,
          close: Math.round(res.query.results.quote[i].Close * 10)/10};
        this.chartCollection.push(processedData);
        //console.log('ngOnInit(): processed', this.chartCollection)
        this.updateChart();
      });
  }

  updateChart(){
    if(this.chartCollection.length >= this.charts){
      this.chartData = [];
      this.chartCollection.forEach(chart => this.chartData.push(chart));
      //console.log('updateChart()', this.chartData);
    }
  }
}

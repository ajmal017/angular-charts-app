import { Component, OnInit, Input, ViewChild } from '@angular/core';


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
  public charts: number
  model: NgbDateStruct;
  date: {year: number, month: number};
  selectedDate;

  public stockSymbols: string[];

  @ViewChild('fromDate') fromDateComponent;
  @ViewChild('toDate') toDateComponent;

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

onNotify(message): void {
  this.stockSymbols = message;
}

setDate(message, toOrFrom): void {
  this.selectedDate[toOrFrom] = message;
}
  constructor(
    private _api: ApiService,
    private _log: Logger
  ){}

  ngOnInit(): void {
    this.selectedDate = {from: '2016-01-11', to: '2017-01-10'}
    this.fromDateComponent.init('From', this.selectedDate.from);
    this.toDateComponent.init('To', this.selectedDate.to);
    this.stockSymbols = ['AMZN', 'GOOGL']
    this.charts = this.stockSymbols.length;
    // this.stockSymbols.forEach(symbol => this.addData(symbol));
  }

  addData(ticker){
    let query = this._api.buildQuery(ticker, this.selectedDate.from, this.selectedDate.to);
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

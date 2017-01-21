import { Component, OnInit, Input, ViewChild } from '@angular/core';


import { ApiService } from './shared/api.service';
import { Logger } from './shared/logger.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.view.css']
})
export class AppComponent implements OnInit {
  public stockSymbols: string[];
  private chartCollection = [];
  private companyCollection = [];
  private chartData;
  public 
  public selectedDate;


  @ViewChild('fromDate') fromDateComponent;
  @ViewChild('toDate') toDateComponent;


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
    //this.stockSymbols.forEach(symbol => this.getStockHistory(symbol));
    this.getStockInfo(this.stockSymbols)
  }

  getStockHistory(ticker){
    let query = this._api.buildHistoryQuery(ticker, this.selectedDate.from, this.selectedDate.to);
    //console.log('ngOnInit(): ', query);
    this._api.queryAPI(query)
      .subscribe(res => {
        //console.log('ngOnInit(): retrieved ', res);
        let processedData = {id: ticker, values: []};
        for(let i=0; i<res.query.results.quote.length; i++)
          processedData.values[res.query.results.quote.length-i-1] = {date: res.query.results.quote[i].Date,
          close: Math.round(res.query.results.quote[i].Close * 10)/10};
        this.chartCollection.push(processedData);
        //console.log('ngOnInit(): processed', this.chartCollection)
        this.updateChart();
      });
  }

  getStockInfo(ticker){
    let query = this._api.buildQuoteQuery(ticker.join('","'));
    this.companyCollection = [];
    //console.log('ngOnInit(): ', query);
    this._api.queryAPI(query)
      .subscribe(res => {
        res.query.results.quote.forEach(quote => {
          let companyData = {
            id: ticker,
            symbol: quote.Symbol,
            name: quote.Name,
            exchange: quote.StockExchange,
            marketcap: quote.MarketCapitalization,
            range: quote.YearRange,
            volume: quote.Volume
          }
          this.companyCollection.push(companyData);
        });
      });
  }

  updateChart(){
    if(this.chartCollection.length >= this.stockSymbols.length){
      this.chartData = [];
      this.chartCollection.forEach(chart => this.chartData.push(chart));
      //console.log('updateChart()', this.chartData);
    }
  }

  removeStock(){
    console.log('Stock Removed');
  }
}

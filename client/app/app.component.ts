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
  public selectedDate;
  public errorMessage = { search: '', date: '', remove: '' }


  @ViewChild('fromDate') fromDateComponent;
  @ViewChild('toDate') toDateComponent;


onNotify(message): void {
  this.stockSymbols = message;
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
    this._api.queryAPI(query)
      .subscribe(res => {
        console.log('getStockInfo(ticker): ', res);
        if(Array.isArray(res.query.results.quote)){
          res.query.results.quote.forEach(quote => {
          this.companyCollection.push(
            this.extractCompanyInfo(ticker, quote));
          });
        } else { // Single item in resposne
          this.companyCollection.push(
            this.extractCompanyInfo(ticker, res.query.results.quote));
        }
        console.log('done: ', this.companyCollection);
      });
  }

  extractCompanyInfo(ticker, quote){
    return {
      id: ticker,
      symbol: quote.Symbol,
      name: quote.Name,
      exchange: quote.StockExchange,
      marketcap: quote.MarketCapitalization,
      range: quote.YearRange,
      volume: quote.Volume
    }
  }

  updateChart(){
    if(this.chartCollection.length >= this.stockSymbols.length){
      this.chartData = [];
      this.chartCollection.forEach(chart => this.chartData.push(chart));
      //console.log('updateChart()', this.chartData);
    }
  }

  removeStock(symbol){
    if(this.stockSymbols.length > 1){
      let newStockSymbols = []
      this.stockSymbols.forEach(stock => {
        if(stock != symbol) newStockSymbols.push(stock);
      });
      this.stockSymbols = newStockSymbols;
      this.getStockInfo(this.stockSymbols)
    } else {
      this.errorMessage.remove = 'Add another stock to remove ' + symbol;
    }
  }

  addStock(stock){
    let query = this._api.buildQuoteQuery(stock);
    this._api.queryAPI(query)
      .subscribe(res => {
        if(res.query.results.quote.Name){
          console.log('success, adding')
          this.stockSymbols.push(stock.toUpperCase())
          this.getStockInfo(this.stockSymbols)
        } else{
          console.log('trigger error')
          this.errorMessage.search = stock + ' was not found.'
        }
      });
  }

  setDate(proposedDate, toOrFrom): void {
    let newDate = new Date(proposedDate);
    if(toOrFrom == 'to'){
      if(newDate.getTime() - (new Date(this.selectedDate.from).getTime()) > 0) {
        this.selectedDate.to = proposedDate;
      } else {
        this.errorMessage.date = 'Dates must be sequential. ' + proposedDate + ' is not valid.'
      }
    } else {
      if((new Date(this.selectedDate.to).getTime()) - newDate.getTime() > 0) {
        this.selectedDate.from = proposedDate;
      } else {
        this.errorMessage.date = 'Dates must be sequential. ' + proposedDate + ' is not valid.'
      }
    }
  }
}

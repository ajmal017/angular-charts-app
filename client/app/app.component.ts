import { Component, OnInit } from '@angular/core';


import { ApiService } from './shared/api.service';
import { Logger } from './shared/logger.service';

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

  constructor(
    private _api: ApiService,
    private _log: Logger
  ){}

  ngOnInit(): void {
    this.addData('GOOGL');
    this.addData('MSFT');
  }

  addData(ticker){
    let query = this._api.buildQuery(ticker, this.startDate, this.endDate);
    //console.log('ngOnInit(): ', query);
    this._api.getHistory(query)
      .subscribe(res => {
        //console.log('ngOnInit(): retrieved ', res);
        let processedData = [];
        for(let i=0; i<res.query.results.quote.length; i++){
          processedData.push({
            Date  : res.query.results.quote[i].Date,
            Close : res.query.results.quote[i].Close,
          })
        }
        this.chartCollection[this.chartCollection.length] = processedData;
        console.log('ngOnInit(): processed', this.chartCollection)
        this.updateChart();
      });
  }

  updateChart(){
    this.chartData = [];
    this.chartCollection.forEach(chart => this.chartData.push(chart));
    console.log('updateChart()', this.chartData);
  }
}

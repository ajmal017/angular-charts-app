import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

declare var techan: any;

@Component({
  selector: 'stock-chart',
  templateUrl: './stock-chart.view.html',
  styleUrls: ['./stock-chart.view.css'],
  encapsulation: ViewEncapsulation.None
})
export class StockChartComponent implements OnInit, OnChanges {
  @ViewChild('stockchart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  private margin: any = { top: 20, bottom: 30, left: 50, right: 20};
  private width: number;
  private height: number;
  private chart: any;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  //private parseDate: any;
  private svg: any;
  private adx: any;
  private close: any;
  private element: any;

  constructor() { }

  ngOnInit() {
    console.log('ngOnInit');
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    //console.log('ngOnChanges():', this.data);
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    console.log('createChart()', this.chartContainer);
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    console.log('set parseDate');
    
    console.log('set svg');
    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);
    console.log('build chart');

    // chart plot area
    this.chart = this.svg
      .append('g')
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    console.log('this.chart: ', this.chart);
    // define X & Y domains
    // let xDomain = this.data.map(d => d[0]);
    // let yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    this.xScale = techan.scale.financetime().range([0, this.width]);
    console.log('xscale: ', this.xScale);
    this.yScale = d3.scaleLinear().range([this.height, 0]);

    //this.adx = techan.plot.adx().xScale(this.xScale).yScale(this.yScale);
    this.close = techan.plot.close().xScale(this.xScale).yScale(this.yScale);
    // x & y axis
    this.xAxis = d3.axisBottom(this.xScale);
    //this.yAxis = d3.axisLeft(this.yScale).tickFormat(d3.format(",.3s"));
    this.yAxis = d3.axisLeft(this.yScale);
  }

  updateChart() {
    console.log('updateChart(): ', this.chart)
    //let accessor = this.adx.accessor();
    var accessor = this.close.accessor();
    // update scales & axis
    console.log('set domain')
    // this.xScale.domain(this.data.map(d => d[0]));
    // this.yScale.domain([0, d3.max(this.data, d => d[1])]);

    let parseDate = d3.timeParse("%Y-%m-%d");

    let processedData = this.data.slice(0, 200).map(function(d) {
      return {
        date: parseDate(d.Date),
        open: +d.Open,
        high: +d.High,
        low: +d.Low,
        close: +d.Close,
        volume: +d.Volume
      };
    }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });

    console.log('process data: ');
    // let processedData = this.data.map(function(d) {
    //   return {
    //     date: parseDate(d.Date),
    //     volume: +d.Volume,
    //     open: +d.Open,
    //     high: +d.High,
    //     low: +d.Low,
    //     close: +d.Close
    //   };
    // }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });
    console.log('data processed: ', processedData);

    // this.svg.append("g")
    //   .attr("class", "adx");
      this.svg.append("g")
              .attr("class", "close");

    this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")");

    this.svg.append("g")
      .attr("class", "y axis")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Average Directional Index");
      console.log('drawing: ');

      this.draw(processedData.slice(0, processedData.length-20));
    //this.draw(processedData.slice(0, processedData.length-20));
  }


  draw(data) {
      this.xScale.domain(data.map(this.close.accessor().d));
      this.yScale.domain(techan.scale.plot.ohlc(data, this.close.accessor()).domain());

      this.svg.selectAll("g.close").datum(data).call(this.close);
      this.svg.selectAll("g.x.axis").call(this.xAxis);
      this.svg.selectAll("g.y.axis").call(this.yAxis);
  }

  // draw(data) {
  //   var adxData = techan.indicator.adx()(data);
  //   this.xScale.domain(adxData.map(this.adx.accessor().d));
  //   this.yScale.domain(techan.scale.plot.adx(adxData).domain());

  //   this.svg.selectAll("g.adx").datum(adxData).call(this.adx);
  //   this.svg.selectAll("g.x.axis").call(this.xAxis);
  //   this.svg.selectAll("g.y.axis").call(this.yAxis);
  // }
}

import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

declare var techan: any;

@Component({
  selector: 'linechart',
  templateUrl: './linechart.view.html',
  styleUrls: ['./linechart.view.css'],
  encapsulation: ViewEncapsulation.None
})
export class LinechartComponent implements OnInit, OnChanges {
  @ViewChild('linechart') private chartContainer: ElementRef;
  @Input() private data;
  private margin: any = { top: 20, bottom: 30, left: 50, right: 20};
  private width: number;
  private height: number;
  private chart: any;
  private xScale: any;
  private yScale: any;
  private zScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  //private parseDate: any;
  private svg: any;
  private adx: any;
  private close: any;
  private element: any;

  private line: any;

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

    // create scales
    this.xScale = d3.scaleTime().range([0, this.width]),
    console.log('xscale: ', this.xScale);
    this.yScale = d3.scaleLinear().range([this.height, 0]),
    this.zScale = d3.scaleOrdinal(d3.schemeCategory10);


   this.line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d: any) { return this.xScale(d.date); })
    .y(function(d: any) { return this.yScale(d.temperature); });

  }

  updateChart() {
    console.log('entering  updateChart()');
    let parseDate = d3.timeParse("%Y-%m-%d");

    console.log('declaring cities: ', this.data);
  var cities = this.data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: this.data.map(function(d) {
        return {date: d.date, temperature: d[id]};
      })
    };
  });

    console.log('setting scales', cities);
  this.xScale.domain(d3.extent(this.data, function(d: any) { return d.date; }));

  this.yScale.domain([
    d3.min(cities, function(c: any) { 
      return d3.min(c.values, function(d: any) { 
        return d.temperature; 
      }); 
    }),
    d3.max(cities, function(c: any) { 
      return d3.max(c.values, function(d: any) { 
        return d.temperature; 
      }); 
    })
  ]);

  this.zScale.domain(cities.map(function(c) { return c.id; }));


    console.log('appending axis');
  this.chart.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale));

  this.chart.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(this.yScale))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Temperature, ºF");

    console.log('appending cities');
  var city = this.chart.selectAll(".city")
    .data(cities)
    .enter().append("g")
      .attr("class", "city");

    console.log('setting path');

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return this.line(d.values); })
      .style("stroke", function(d) { return this.zScale(d.id); });

  city.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { 
        return "translate(" + this.xScale(d.value.date) + "," + 
          this.yScale(d.value.temperature) + ")"; 
        })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });

  }

}

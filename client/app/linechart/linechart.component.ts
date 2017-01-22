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

  //private line: any;

  constructor() { }

  ngOnInit() {
    //console.log('ngOnInit');
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    //console.log('ngOnChanges():', this.data);
    if (this.chart) {
      this.clearChart();
      this.updateChart();
    }
  }

  createChart() {
    //console.log('createChart()', this.chartContainer);
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right - 40;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    //console.log('set parseDate');


    //console.log('set svg');
    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);
    //console.log('build chart');

    // chart plot area
    this.chart = this.svg
      .append('g')
      .attr("id", "thechart")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    //console.log('this.chart: ', this.chart);


    


  }

  updateChart() {

    // create scales
    var xScale = d3.scaleTime().range([0, this.width]);
    //console.log('xscale: ', xScale);
    var yScale = d3.scaleLinear().range([this.height, 0]);

    //console.log('entering  updateChart()');
    let parseDate = d3.timeParse("%Y-%m-%d");

    console.log('declaring cities: ', this.data);
  // var cities = this.data.columns.slice(1).map(function(id) {
  //   return {
  //     id: id,
  //     values: this.data.map(function(d) {
  //       return {date: d.date, close: d[id]};
  //     })
  //   };
  // });
  var cities = this.data;
  cities.forEach(city => { // lines that were processed once are already converted
    if(typeof city.values[0].date === 'string' || 
      city.values[0].date instanceof String) {
      city.values.forEach(entry => {
        entry.date = parseDate(entry.date);
        entry.close = +entry.close;
      })
    } else {
      city.values.forEach(entry => {
        entry.date = entry.date;
        entry.close = +entry.close;
      })        
    }
  })

    //console.log('setting scales', cities);
  xScale.domain(d3.extent(cities[0].values, function(d: any) { return d.date; }));

  yScale.domain([
    d3.min(cities, function(c: any) { 
      return d3.min(c.values, function(d: any) { 
        return d.close; 
      }); 
    }),
    d3.max(cities, function(c: any) { 
      return d3.max(c.values, function(d: any) { 
        return d.close; 
      }); 
    })
  ]);




    console.log('appending axis');
  this.chart.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(xScale));

  this.chart.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Price, USD");

      console.log('Adding cities data: ', cities)

  var city = this.chart.selectAll(".city")
    .data(cities)
    .enter().append("g")
      .attr("class", "city");

  var zScale = d3.scaleOrdinal(d3.schemeCategory10);
  zScale.domain(cities.map(function(c) { return c.id; }));

   var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d: any) { return xScale(d.date); })
    .y(function(d: any) { return yScale(d.close); });

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return zScale(d.id); });

  city.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { 
        return "translate(" + xScale(d.value.date) + "," + 
          yScale(d.value.close) + ")"; 
        })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });
      console.log('Done generating chart')

    //this.correctDates();
  }

  clearChart(){
    var element = document.getElementById("thechart");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

}

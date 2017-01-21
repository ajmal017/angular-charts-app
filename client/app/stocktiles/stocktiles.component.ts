import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'stocktiles',
  templateUrl: 'stocktiles.view.html',
  styleUrls: ['stocktiles.view.css']
})
export class StockTilesComponent {
  private bricks = [];
  
  @Input() companyCollection
  @Output() notify = new EventEmitter();


  onClick() {
    //this.notify.emit(['AMZN', 'GOOGL', 'MA']);
    console.log(this.companyCollection);
  }
  
  increment() {
  }
}

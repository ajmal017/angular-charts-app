import {Component, Input,
         Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'stocktiles',
  templateUrl: 'stocktiles.view.html',
  styleUrls: ['stocktiles.view.css']
})
export class StockTilesComponent {
  private bricks = [];
  
  @Input() stockSymbols
  @Output() notify = new EventEmitter();


  onClick() {
    this.notify.emit(['AMZN', 'GOOGL', 'MA']);
  }
  
  increment() {
  }
}

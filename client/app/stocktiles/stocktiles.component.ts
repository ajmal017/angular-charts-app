import {Component, Input} from '@angular/core';

@Component({
  selector: 'stocktiles',
  templateUrl: 'stocktiles.view.html',
  styleUrls: ['stocktiles.view.css']
})
export class StockTilesComponent {
  private bricks = [];

  public stock: string;
}

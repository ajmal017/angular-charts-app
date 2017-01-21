import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'stockpicker',
  templateUrl: 'stockpicker.view.html',
  styleUrls: ['stockpicker.view.css']
})
export class StockPickerComponent {

  @Output() notify = new EventEmitter();

  public stock: string;
  model;

  stockSubmit() {
    this.notify.emit(this.model);
  }
}

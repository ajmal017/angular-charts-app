import {Component, Input} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'datepicker',
  templateUrl: 'datepicker.view.html',
  styleUrls: ['datepicker.view.css']
})
export class NgbdDatepickerPopup {
  model;
  date: {year: number, month: number};

  @Input() toOrFrom: string;

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
}

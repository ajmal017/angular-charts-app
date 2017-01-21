import {Component, OnInit Output, EventEmitter} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'datepicker',
  templateUrl: 'datepicker.view.html',
  styleUrls: ['datepicker.view.css']
})
export class NgbdDatepickerPopup implements OnInit {
  model;
  lastModel;
  date: {year: number, month: number};
  
  public dateLabel: string;
  public selectedDate
  @Output() notify = new EventEmitter();

  ngOnInit(){
    /* Ugly workaround due to less than comprehensive input field change detection
     * and lacking event emitters in NgbDatepicker */
    setInterval(() => {
      if(this.model != this.lastModel){
        this.dateSubmit();
        this.lastModel = this.model;
      }
    }, 1000); // Fast enough
  }

  onNotify(notified){
    console.log(notified)
  }


  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  dateSubmit() {
    let day = (this.model.day > 9) ?
      this.model.day : '0' + this.model.day;
    let month = (this.model.month > 9) ?
      this.model.month : '0' + this.model.month;
    this.notify.emit(this.model.year + '-' +
      month + '-' + day);
  }
  
  init(setLabel, setDate){
    this.setDate(setDate);
    this.dateLabel = setLabel;
  }
  
  setDate(yyy_mm_dd){
    let date = new Date(yyy_mm_dd);
    this.model = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate() + 1
    }
    this.lastModel = this.model;
  }
}

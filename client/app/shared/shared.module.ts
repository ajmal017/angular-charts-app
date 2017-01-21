import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasonryModule } from 'angular2-masonry';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockPickerComponent } from './stockpicker/stockpicker.component';
import { NgbdDatepickerPopup } from './datepicker/datepicker.component';

import { ApiService } from './api.service';
import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,   
    NgbModule.forRoot(),
  ],
  declarations: [
    NgbdDatepickerPopup,
    StockPickerComponent
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbdDatepickerPopup,
    StockPickerComponent,
    MasonryModule
  ],
  providers: [
    ApiService,
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler },
  ],
})
export class SharedModule { }

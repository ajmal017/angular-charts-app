import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { LinechartComponent } from './linechart/linechart.component';
import { StockPickerComponent } from './stockpicker/stockpicker.component';
import { StockTilesComponent } from './stocktiles/stocktiles.component';
import { NgbdDatepickerPopup } from './datepicker/datepicker.component';


import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    SharedModule
  ],
  declarations: [
    AppComponent,
    LinechartComponent,
    NgbdDatepickerPopup,
    StockPickerComponent,
    StockTilesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

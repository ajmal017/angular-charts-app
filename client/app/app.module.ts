import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home.component';
import { BarchartComponent } from './shared/barchart/barchart.component';
import { StockChartComponent } from './shared/stock-chart/stock-chart.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    BarchartComponent,
    StockChartComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

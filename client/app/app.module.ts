import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { LinechartComponent } from './shared/linechart/linechart.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    LinechartComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { LinechartComponent } from './shared/linechart/linechart.component';

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
    LinechartComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

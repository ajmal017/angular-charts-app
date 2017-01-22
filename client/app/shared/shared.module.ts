import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasonryModule } from 'angular2-masonry';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './api.service';
import { SocketIoService } from './socket-io.service';
import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,   
    NgbModule.forRoot(),
  ],
  declarations: [
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MasonryModule
  ],
  providers: [
    ApiService,
    SocketIoService,
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: 'api-url', useValue: environment.api_url },
  ],
})
export class SharedModule { }

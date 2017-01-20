import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from './api.service';
import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ApiService,
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler },
  ],
})
export class SharedModule { }

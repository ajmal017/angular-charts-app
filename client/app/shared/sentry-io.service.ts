import { ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';

Raven
  .config('https://768d0e45a74d463bab63542462d1832f@sentry.io/130915')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err.originalError);
  }
}
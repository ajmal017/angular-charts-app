import { Injectable, Inject } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { Logger } from "./logger.service";

@Injectable()
export class SocketIoService {
  private socket;

  constructor(
    private _log: Logger,
    @Inject('api-url') private _api: string
  ){}

  sendMessage(message){
    this.socket.emit('add-message', message);
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this._api);
      this.socket.on('message', (data) => {
        console.log('socket data: ', data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
  return observable;
  }
}
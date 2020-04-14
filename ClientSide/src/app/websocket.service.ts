import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/* import * as Rx from 'rxjs'; */

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  ws: WebSocket;

  createSocket(url): Observable<any> {
    this.ws = new WebSocket(url);

    return new Observable(
      Observer => {
        this.ws.onmessage = (event) => Observer.next(event.data);
        this.ws.onerror = (event) => Observer.error(event);
        this.ws.onclose = (event) => Observer.complete();

        return () => this.ws.close(1000, "user disconnected!");
      }
    )
  }

  sendMsg(msg) {
    if (this.ws.readyState == WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
      return "message sent!";
    } else {
      return "socket closed.";
    }
  }
}

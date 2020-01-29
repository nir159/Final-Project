import { Injectable } from '@angular/core';
import { configuration } from './configuration'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config = configuration;

  constructor() { }

  getConfig() {
    return this.config;
  }

  getBoardById(id: number) {
    return this.config.boards.boardslist[id-1];
  }
}

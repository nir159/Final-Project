import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups;

  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.groups = this.getClients();
  }

  getClients(){
    return this.config.getConfig().clients;
  }
}

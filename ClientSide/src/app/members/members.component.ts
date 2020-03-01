import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members;
  
  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.members = this.getTestimonials();
  }

  getTestimonials() {
    return this.config.getConfig().testimonials;
  }

}

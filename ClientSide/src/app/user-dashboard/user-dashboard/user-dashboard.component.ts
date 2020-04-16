import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { 
    
  }

  user = JSON.parse(localStorage.getItem('currentUser'));
  first = "";
  last = "";

  ngOnInit() {
    
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/login']);
  }

  firstChanged(event) {
    this.first = event.target.value;
  }

  lastChanged(event) {
    this.last = event.target.value;
  }

  update() {
    this.user.first_name = this.first;
    this.user.last_name = this.last;
    this.api.updateUser(this.user);
  }

}

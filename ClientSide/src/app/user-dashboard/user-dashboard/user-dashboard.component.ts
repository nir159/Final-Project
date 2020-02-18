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

  user = {first_name: "fname", last_name: "lname", email: "@gmail.com"};

  ngOnInit() {
    /* this.api.login(JSON.parse(localStorage.getItem('currentUser')).email).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
      }
    ); */
  }

  getUser() {
    if (localStorage.getItem('currentUser')) {
      //this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/login']);
  }

}

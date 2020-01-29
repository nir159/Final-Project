import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  user: any = {firstName: 'pname', lastName: 'fname', bio: 'description', email: 'email@gmail.com', userImage: 'assets/images/user-images/user-1.jpg'};

  constructor(private router: Router) { }

  ngOnInit() {
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

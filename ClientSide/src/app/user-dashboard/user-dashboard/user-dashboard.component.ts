import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { RenameUserComponent } from 'src/app/rename-user/rename-user.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, public dialog: MatDialog) { 
    
  }

  user = JSON.parse(localStorage.getItem('currentUser'));

  ngOnInit() {
    
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/login']);
  }

  openRename() {
    let dialogRef = this.dialog.open(RenameUserComponent, {
      width: '400px',
      height: '340px',
      data: {first: this.user.first_name, last: this.user.last_name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.first && result.last) {
        if (result.first != this.user.first_name || result.last != this.user.last_name) {
          this.user.first_name = result.first;
          this.user.last_name = result.last;
          this.api.updateUser(this.user).subscribe(
            data => {
              
            },
            error => {
              console.log(error);
          });
        }
      }
    });
  }

}

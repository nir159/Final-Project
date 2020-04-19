import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isActive = false;
  profileImage = "'../assets/images/user-images/default-user.jpg'";
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.elementRef.nativeElement.contains(event.target) && event.target.id != "navButton") {
      this.isActive = false;
    }
  }

  constructor(public api: ApiService, private elementRef:ElementRef) {
    if (localStorage.getItem('currentUser')) {
      this.profileImage = JSON.parse(localStorage.getItem('currentUser')).profile_picture;
    }
  }

  ngOnInit() { 

  }

  close() {
    this.isActive = false;
  }
}

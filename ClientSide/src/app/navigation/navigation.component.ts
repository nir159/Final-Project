import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  profileImage: string;
  userLoggedIn = true;// localStorage.getItem('currentUser');

  constructor(private api: ApiService) { }

  ngOnInit() {

    (<any>$)(document).ready(function () {
      (<any>$)('#nav-mobile').html((<any>$)('#nav-main').html());
      (<any>$)('#nav-trigger span').on('click',function() {
        if ((<any>$)('nav#nav-mobile ul').hasClass('expanded')) {
          (<any>$)('nav#nav-mobile ul.expanded').removeClass('expanded').slideUp(250);
          (<any>$)(this).removeClass('open');
        } else {
          (<any>$)('nav#nav-mobile ul').addClass('expanded').slideDown(250);
          (<any>$)(this).addClass('open');
        }
      });
  
      (<any>$)('#nav-mobile').html((<any>$)('#nav-main').html());
      (<any>$)('#nav-mobile ul a').on('click',function() {
        if ((<any>$)('nav#nav-mobile ul').hasClass('expanded')) {
          (<any>$)('nav#nav-mobile ul.expanded').removeClass('expanded').slideUp(250);
          (<any>$)('#nav-trigger span').removeClass('open');
        }
      });
    });
/* 
    if (!!(<any>$).prototype.stickyNavbar) {
      (<any>$)('#header').stickyNavbar();
    }
  
    (<any>$)('#content').waypoint(function (direction) {
      if (direction === 'down') {
        (<any>$)('#header').addClass('nav-solid fadeInDown');
      }
      else {
        (<any>$)('#header').removeClass('nav-solid fadeInDown');
      }
    }); */
  }

  logout(){
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
    this.userLoggedIn = false;
  }

  getUser() {
    
  }

}

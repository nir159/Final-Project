import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private router: Router, private location: Location, private fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });
  }

  signup(formData: NgForm) {
    /* this.api.createNewUser(formData).subscribe(
      data => {
        //redirecting to boards;
      },
      error => {
        console.log(error);
      }
    ); */ 
    localStorage.setItem('currentUser', JSON.stringify(formData));
    this.router.navigate(['/boards']);
  }

}

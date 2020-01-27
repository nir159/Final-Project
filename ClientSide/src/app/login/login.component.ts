import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(formData: NgForm){
    /* this.api.getAllUsers().subscribe(
      data => {
        //if the user exist: redirecting to boards;
      },
      error => {
        console.log(error);
      }
    ); */
    // first confirm user...
    localStorage.setItem('currentUser', JSON.stringify(formData));
    this.router.navigate([this.returnUrl]);
  }
}
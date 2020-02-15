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
  logFail = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private api: ApiService) { }

  errorMsg = '';

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email' : [null, [Validators.required, Validators.email]],
      'pw' : [null, [Validators.required, Validators.minLength(4)]],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get email() { return this.loginForm.get('email'); }
  get pw() { return this.loginForm.get('pw'); }

  login(formData){
    this.api.login(formData.email).subscribe(
      data => {
        if(!data.length) {
          this.errorMsg = "User doesn't exist!";
          this.logFail = true;
          console.log("Success"); 
          return;
        }
        if(!data[0].pw == formData.pw) {
          this.errorMsg = "Wrong password!";
          this.logFail = true;
          return;
        }
        console.log(data[0]);
        localStorage.setItem('currentUser', JSON.stringify(data[0]));
        this.api.logged();
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.errorMsg = "Server communication error!";
        this.logFail = true;
        console.log(error);
        // test
        localStorage.setItem('currentUser', '{"first_name": "Nir", "last_name": "159", "email": "nir1125111@gmail.com", "pw": "wb32xZ8rPeve4R3"}');
        this.api.logged();
        this.router.navigate([this.returnUrl]);
      }
    );
  }
}
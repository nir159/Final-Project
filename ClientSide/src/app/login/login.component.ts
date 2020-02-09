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
		if (data.length && data[0].pw == formData.pw) {
			console.log("logged");
      localStorage.setItem('currentUser', data[0]);
      this.api.logged();
			this.router.navigate([this.returnUrl]); 
		}
		else{
			this.logFail = true;
		}
      },
      error => {
        console.log(error);
      }
    );
  }
}
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
      'pw' : [null, [Validators.required, Validators.minLength(4)]],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get email() { return this.loginForm.get('email'); }
  get pw() { return this.loginForm.get('pw'); }

  login(formData: NgForm) {
    localStorage.setItem('currentUser', JSON.stringify(formData));
    this.router.navigate([this.returnUrl]); 
  }
}
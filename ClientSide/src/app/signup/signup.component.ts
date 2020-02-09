import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  returnUrl: string;
  signupForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, [Validators.required, Validators.minLength(4)]],
      'rePassword' : [null, Validators.required],
    }, {validator: this.checkPasswords});

    this.returnUrl = "/boards";
  }

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get rePassword() { return this.signupForm.get('rePassword'); }
  get confirmPassword() { return this.signupForm.get('password').value == this.signupForm.get('rePassword').value; }

  checkPasswords(group: FormGroup) {
    if (group.get('password') && group.get('rePassword')){
      return group.get('password').value == group.get('rePassword').value ? null : { notSame: true };
  }
    return null;
  }

  signup = (formData: NgForm) => {
    this.api.signup(JSON.stringify(formData)).subscribe(
      data => {
        localStorage.setItem('currentUser', JSON.stringify(formData));
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
      }
    );
  }

}

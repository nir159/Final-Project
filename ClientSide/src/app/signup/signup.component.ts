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
  signFail = false;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'first_name' : [null, Validators.required],
      'last_name' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'pw' : [null, [Validators.required, Validators.minLength(4)]],
      'rePassword' : [null, Validators.required],
    }, {validator: this.checkPasswords});

    this.returnUrl = "/boards";
  }

  get firstName() { return this.signupForm.get('first_name'); }
  get lastName() { return this.signupForm.get('last_name'); }
  get email() { return this.signupForm.get('email'); }
  get pw() { return this.signupForm.get('pw'); }
  get rePassword() { return this.signupForm.get('rePassword'); }
  get confirmPassword() { return this.signupForm.get('pw').value == this.signupForm.get('rePassword').value; }

  checkPasswords(group: FormGroup) {
    if (group.get('pw') && group.get('rePassword')){
      return group.get('pw').value == group.get('rePassword').value ? null : { notSame: true };
    }
    return null;
  }

  signup = (formData) => {
    const newUser = {first_name: formData.first_name, last_name: formData.last_name, email: formData.email, pw: formData.pw};
    this.api.signup(formData).subscribe(
      data => {
        this.api.getUser(formData.email).subscribe(
          data => {
            localStorage.setItem('currentUser', JSON.stringify(data[0]));
            this.api.userLoggedIn();
            this.router.navigate([this.returnUrl]);
          }
        );
      },
      error => {
        console.log(error);
		    this.signFail = true;
      }
    );
  }

}

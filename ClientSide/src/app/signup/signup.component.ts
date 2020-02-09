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
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'pw' : [null, [Validators.required, Validators.minLength(4)]],
      'rePassword' : [null, Validators.required],
    }, {validator: this.checkPasswords});

    this.returnUrl = "/boards";
  }

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
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

  signup = (formData: NgForm) => {
    this.api.signup(formData).subscribe(
      data => {
        localStorage.setItem('currentUser', JSON.stringify(formData));
        this.api.logged();
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
		    this.signFail = true;
      }
    );
  }

}

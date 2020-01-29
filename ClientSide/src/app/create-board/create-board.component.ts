import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  createBoardForm: FormGroup;
  returnUrl: string;

  constructor(private fb: FormBuilder, private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.createBoardForm = this.fb.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });

  }

  createBoard(formData: NgForm){
    /* this.api.getAllUsers().subscribe(
      data => {
        //if the user exist: redirecting to boards;
      },
      error => {
        console.log(error);
      }
    ); */
    // first confirm user...
  }
}

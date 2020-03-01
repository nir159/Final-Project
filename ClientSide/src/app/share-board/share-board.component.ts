import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-share-board',
  templateUrl: './share-board.component.html',
  styleUrls: ['./share-board.component.css']
})
export class ShareBoardComponent implements OnInit {

  shareBoardForm: FormGroup;
  returnUrl: string;

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private api: ApiService) { }

  ngOnInit() {
    this.shareBoardForm = this.fb.group({
      'email' : [null, [Validators.required, Validators.email]],
      'msg' : [null, Validators.required],
    });
  }

  get email() { return this.shareBoardForm.get('email'); }
  get msg() { return this.shareBoardForm.get('msg'); }

  shareBoard(formData) {
    if (formData.email == JSON.parse(localStorage.getItem('currentUser')).email) {
      // message: user already in board
      return;
    }

    this.api.getUsers(this.api.getBoard().id).subscribe(
      data => {
        JSON.parse(JSON.stringify(data)).forEach(instance => {
          if (formData.email == instance.user) {
            // message: user already in board
            return;
          }
        });
      },
      error => {
        console.log(error);
    });
    
    /* this.api.shareBoard(formData.email, this.api.getBoard()).subscribe(
      data => {
        this.api.createBoardUser(formData.email, this.api.getBoard().id, 'w').subscribe(
          data => {
            this.location.back();
          },
          error => {
            console.log(error); // maybe, cancel the creation
          }
        );
      },
      error => {
        console.log(error);
    }); */
    
    this.api.createBoardUser(formData.email, this.api.getBoard().id, 'w').subscribe(
      data => {
        this.location.back();
      },
      error => {
        console.log(error); // maybe? cancel the creation
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-share-board',
  templateUrl: './share-board.component.html',
  styleUrls: ['./share-board.component.css']
})
export class ShareBoardComponent implements OnInit {

  shareBoardForm: FormGroup;
  returnUrl: string;
  err = false;
  error = '';

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
      this.err = true;
      this.error = "The email is yours!";
      return;
    } else if (this.api.getBoard().users.includes(formData.email)) {
      this.err = true;
      this.error = "User is already in board!";
      return;
    }
    else {
      this.api.getUser(formData.email).subscribe(
        data => {
          if(!data.length) {
            this.error = "User doesn't exist!";
            this.err = true;
            return;
          }
          else {
            let updatedBoard = this.api.getBoard();
            updatedBoard.users = JSON.parse(updatedBoard.users);
            updatedBoard.users.push(formData.email);
            updatedBoard.users = JSON.stringify(updatedBoard.users);
        
            this.api.updateBoard(updatedBoard).subscribe(
              data => {
                this.location.back();
              },
              error => {
                console.log(error);
                this.err = true;
                this.error = "Communication error!";
            });
          }
        },
        error => {
          this.error = "Server communication error!";
          this.err = true;
          console.log(error);
        }
      );
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { ConditionalExpr } from '@angular/compiler';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-share-board',
  templateUrl: './share-board.component.html',
  styleUrls: ['./share-board.component.css']
})
export class ShareBoardComponent implements OnInit, OnDestroy {

  shareBoardForm: FormGroup;
  returnUrl: string;
  err = false;
  error = '';
  allowed = true;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private api: ApiService, private wsService: WebsocketService) { 
    this.subscription = wsService.createSocket(environment.wsurl + 'lobby' + '/')
    .subscribe(
      msg => {
        
      },
      err => console.log(err)
    )
  }

  ngOnInit() {
    this.shareBoardForm = this.fb.group({
      'email' : [null, [Validators.required, Validators.email]],
      'msg' : [null, Validators.required],
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get email() { return this.shareBoardForm.get('email'); }
  get msg() { return this.shareBoardForm.get('msg'); }

  allowedChanged() {
    this.allowed = !this.allowed;
  }

  shareBoard(formData) {
    if (formData.email == JSON.parse(localStorage.getItem('currentUser')).email) {
      this.err = true;
      this.error = "The email is yours!";
      return;
    } else if (JSON.parse(this.api.getBoard().users).includes(formData.email)) {
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
            updatedBoard.permissions = JSON.parse(updatedBoard.permissions);
            if (this.allowed) {
              updatedBoard.permissions.push('w');
            } else {
              updatedBoard.permissions.push('r');
            }
            updatedBoard.permissions = JSON.stringify(updatedBoard.permissions);

            data[0].notifications = JSON.parse(data[0].notifications);
            data[0].notifications.push('new;' + JSON.parse(localStorage.getItem('currentUser')).email + ';' + updatedBoard.name + ';' + formData.msg);
            data[0].notifications = JSON.stringify(data[0].notifications);
            this.api.updateUser(data[0]).subscribe(
              data => {
                
              },
              error => {
                console.log(error);
            });

            this.api.updateBoard(updatedBoard).subscribe(
              data => {
                this.wsService.sendMsg({user: JSON.parse(localStorage.getItem('currentUser')).email, message: 'new' + ';' + formData.email + ';' + updatedBoard.name + ';' + formData.msg});
                
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

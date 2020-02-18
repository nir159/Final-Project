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

  shareBoard(formData){
    this.api.login(formData.email).subscribe(
      data => {
        this.api.shareBoard(data[0].id, this.api.getBoard()).subscribe(
          data => {
            this.location.back();
          },
          error => {
            console.log(error);
        });
      },
      error => {
        console.log(error);
    });
  }
}

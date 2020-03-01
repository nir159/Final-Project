import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Location, DatePipe } from '@angular/common';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css'],
  providers: [DatePipe]
})
export class CreateBoardComponent implements OnInit {

  createBoardForm: FormGroup;
  returnUrl: string;

  constructor(private config: ConfigService, private datePipe: DatePipe, private fb: FormBuilder, private router: Router, private location: Location, private api: ApiService) { }

  ngOnInit() {
    this.createBoardForm = this.fb.group({
      'name' : [null, [Validators.required]],
      'desc' : [null, Validators.required],
    });
  }

  get name() { return this.createBoardForm.get('name'); }
  get desc() { return this.createBoardForm.get('desc'); }

  createBoard(formData: NgForm){
    let myDate = new Date();
    this.api.createBoard(formData, this.datePipe.transform(myDate, 'yyyy-MM-dd')).subscribe(
      data => {
        this.api.createBoardUser(JSON.parse(localStorage.getItem('currentUser')).email, data.id, 'w').subscribe(
          data => {
            this.location.back();
          },
          error => {
            console.log(error); // maybe? cancel the creation
          }
        );
      },
      error => {
        console.log(error);
        //this.config.getConfig().boards.boardslist.push(formData);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  createBoardForm: FormGroup;
  returnUrl: string;

  constructor(private config: ConfigService, private fb: FormBuilder, private router: Router, private location: Location, private api: ApiService) { }

  ngOnInit() {
    this.createBoardForm = this.fb.group({
      'name' : [null, [Validators.required]],
      'desc' : [null, Validators.required],
    });
  }

  get name() { return this.createBoardForm.get('name'); }
  get desc() { return this.createBoardForm.get('desc'); }

  createBoard(formData: NgForm){
    this.api.createBoard(JSON.stringify(formData)).subscribe(
      data => {
        // go to the board this.router.navigate([this.returnUrl]);
        this.location.back();
      },
      error => {
        console.log(error);
        //this.config.getConfig().boards.boardslist.push(formData);
      }
    );
    // first confirm user...
  }
}

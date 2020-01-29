import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() pager;
  @Output() setPageEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setPage(page: number) {
    this.setPageEmitter.emit(page);
  }

}

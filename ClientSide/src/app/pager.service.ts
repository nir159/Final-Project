import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() { }

  getPager(totalItems: number, currentPage: number = 1, pageCapacity: number = 10) {
    let totalPages = Math.ceil(totalItems/pageCapacity);

    if(currentPage < 1) { currentPage = 1 }
    if(currentPage > totalPages) { currentPage = totalPages }

    let shownStart: number, shownEnd: number;
    if (totalPages <= 5) {
      shownStart = 1;
      shownEnd = totalPages;
    } else {
      if (currentPage <= 3) {
        shownStart = 1;
        shownEnd = 5;
      } else if (currentPage + 2 >= totalPages) {
        shownStart = totalPages - 4;
        shownEnd = totalPages;
      } else {
        shownStart = currentPage - 2;
        shownEnd = currentPage + 2;
      }
    }
 
    let startIndex = (currentPage - 1) * pageCapacity; //first element
    let endIndex = Math.min((startIndex + pageCapacity - 1), (totalItems - 1)); //last element

    let pages = Array.from(Array((shownEnd + 1) - shownStart).keys()).map(i => shownStart + i);
  
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageCapacity: pageCapacity,
      totalPages: totalPages,
      shownStart: shownStart,
      shownEnd: shownEnd,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }
}
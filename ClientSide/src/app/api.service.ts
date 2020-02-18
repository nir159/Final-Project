import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService { 

  baseurl = "http://f18a4a37.ngrok.io/"; 
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  userLogged = false;
  userId = -1;
  board;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
  }

  // user authentication

  getUserId() {
    return this.userId;
  }

  isUserLogged() {
    return this.userLogged;
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.baseurl + '/users/', {headers: this.httpHeaders});
  }

  login(email: string): Observable<any> {
    return this.http.get(this.baseurl + 'my_users/get_user/?search=' + email, {headers: this.httpHeaders});
  }

  signup(user): Observable<any> {
    const newUser = {first_name: user.firstName, last_name: user.lastName, email: user.email, pw: user.pw};
    return this.http.post(this.baseurl + 'my_users/my_users/', newUser, {headers: this.httpHeaders});
  }

  getId(email: string) {
    return this.http.get(this.baseurl + 'my_users/get_user/?search=' + email, {headers: this.httpHeaders});
  }
  
  getBoards(id: number) {
    return this.http.get(this.baseurl + 'boards/get_boards_id/?search=' + this.userId, {headers: this.httpHeaders});
  }

  logged(id: number) {
    console.log(id);
    this.userLogged = true;
    this.userId = id;
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
    this.userId = -1;
    this.userLogged = false;
  }

  // board control

  setBoard(board) {
    this.board = board;
  }

  createBoard(board, currDate): Observable<any> {
    const newBoard = {name: board.name, owner : this.userId, last_opened: currDate, desc: board.desc, creation_time: currDate, json_board: '{}'};
    return this.http.post(this.baseurl + 'boards/boards/', newBoard, {headers: this.httpHeaders});
  }

  removeBoard(userId: number, boardId: number) {
    return this.http.delete(this.baseurl + 'boards/boards/' + boardId + '/', {headers: this.httpHeaders});
  }

  getBoard() {
    return this.board;
  }

  shareBoard(targetId, board) {
    const newBoard = {name: board.name, owner: targetId, last_opened: board.last_opened, desc: board.desc, creation_time: board.creation_time, json_board: board.json_board};
    console.log(newBoard);
    return this.http.post(this.baseurl + 'boards/boards/', newBoard, {headers: this.httpHeaders});
  }

  saveCanvas(shapes) {
    const newBoard = {name: this.board.name, owner : this.board.owner, last_opened: this.board.last_opened, desc: this.board.desc, creation_time: this.board.creation_time, json_board: shapes.toString()};
    console.log(newBoard);
    return this.http.put(this.baseurl + 'boards/boards/' + this.board.id + '/', newBoard, {headers: this.httpHeaders})
  }

  /* getAllMovies(): Observable<any>{
    return this.http.get(this.baseurl + '/movies/', {headers: this.httpHeaders});
  }

  getMovie(id): Observable<any>{
    return this.http.get(this.baseurl + '/movies/' + id + '/', {headers: this.httpHeaders});
  }

  updateMovie(movie): Observable<any> {
    const body = {title: movie.title, desc: movie.desc, year: movie.year};
    return this.http.put(this.baseurl + '/movies/' + movie.id + '/', body, {headers: this.httpHeaders});
  }

  createMovie(movie): Observable<any> {
    const body = {title: movie.title, desc: movie.desc, year: movie.year};
    return this.http.post(this.baseurl + '/movies/', body, {headers: this.httpHeaders});
  }

  deleteMovie(id): Observable<any> {
    return this.http.delete(this.baseurl + '/movies/' + id + '/', {headers: this.httpHeaders});
  } */
}

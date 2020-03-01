import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl = "http://6935b680.ngrok.io/"; 
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  userLogged = false;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('currentUser')) {
      this.userLogged = true;
    }
  }

  // user authentication

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
    const newUser = {first_name: user.first_name, last_name: user.last_name, email: user.email, pw: user.pw};
    return this.http.post(this.baseurl + 'my_users/my_users/', newUser, {headers: this.httpHeaders});
  }

  logged() {
    this.userLogged = true;
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
    this.userLogged = false;
  }

  // board control

  setBoard(board) {
    localStorage.setItem('currentBoard', JSON.stringify(board));
  }

  getBoard() {
    return JSON.parse(localStorage.getItem('currentBoard'));
  }

  getBoards() {
    return this.http.get(this.baseurl + 'boards/get_boards/?search=' + JSON.parse(localStorage.getItem('currentUser')).email, {headers: this.httpHeaders});
  }

  createBoard(board, currDate): Observable<any> {
    const newBoard = {name: board.name, owner : JSON.parse(localStorage.getItem('currentUser')).email, last_opened: currDate, desc: board.desc, creation_time: currDate, json_board: '{}'};
    return this.http.post(this.baseurl + 'boards/boards/', newBoard, {headers: this.httpHeaders});
  }

  shareBoard(targetEmail, board) {
    const newBoard = {name: board.name, owner: targetEmail, last_opened: board.last_opened, desc: board.desc, creation_time: board.creation_time, json_board: board.json_board};
    return this.http.post(this.baseurl + 'boards/boards/', newBoard, {headers: this.httpHeaders});
  }

  createBoardUser(user, boardId, permissions) {
    const newInstance = {user: user, board: boardId, permissions: permissions, in_board: false};
    return this.http.post(this.baseurl + 'users_in_board/users_in_board/', newInstance, {headers: this.httpHeaders});
  }

  getUsers(boardId) {
    return this.http.get(this.baseurl + 'users_in_board/get_users_in_board/?search=' + boardId, {headers: this.httpHeaders});
  }

  removeBoard(userId: number, boardId: number) {
    return this.http.delete(this.baseurl + 'boards/boards/' + boardId + '/', {headers: this.httpHeaders});
  }

  saveCanvas(shapes) {
    let board = this.getBoard();
    const newBoard = {name: board.name, owner : board.owner, last_opened: board.last_opened, desc: board.desc, creation_time: board.creation_time, json_board: shapes.toString()};
    console.log(newBoard);
    return this.http.put(this.baseurl + 'boards/boards/' + board.id + '/', newBoard, {headers: this.httpHeaders})
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl = environment.baseurl;
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

  userLoggedIn() {
    this.userLogged = true;
  }

  userLoggedOut() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
    this.userLogged = false;
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.baseurl + '/users/', {headers: this.httpHeaders});
  }

  getUser(email: string): Observable<any> {
    return this.http.get(this.baseurl + 'my_users/get_user/?search=' + email, {headers: this.httpHeaders});
  }

  signup(user): Observable<any> {
    return this.http.post(this.baseurl + 'my_users/my_users/', user, {headers: this.httpHeaders});
  }

  updateUser(user) {
    let board = this.getBoard();
    const newUser = {first_name: user.first_name, last_name: user.last_name, email: user.email, pw: user.pw, boards: user.boards};
    return this.http.put(this.baseurl + 'my_users/_user/' + user.email + '/', newUser, {headers: this.httpHeaders})
  }

  // board control

  setBoard(board) {
    localStorage.setItem('currentBoard', JSON.stringify(board));
  }

  getBoard() {
    return JSON.parse(localStorage.getItem('currentBoard'));
  }

  getBoardById(id) {
    return this.http.get(this.baseurl + 'boards/boards/' + id + '/', {headers: this.httpHeaders});
  }

  getBoardsOfUser() {
    return this.http.get(this.baseurl + 'boards/get_boards/?search=' + JSON.parse(localStorage.getItem('currentUser')).email, {headers: this.httpHeaders});
  }

  getAllBoards() {
    return this.http.get(this.baseurl + 'boards/boards/', {headers: this.httpHeaders});
  }

  createBoard(board): Observable<any> {
    return this.http.post(this.baseurl + 'boards/boards/', board, {headers: this.httpHeaders});
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

  /* saveCanvas(shapes) {
    let board = this.getBoard();
    const newBoard = {name: board.name, owner : board.owner, last_opened: board.last_opened, desc: board.desc, creation_time: board.creation_time, json_board: shapes.toString(), users: board.users};
    return this.http.put(this.baseurl + 'boards/boards/' + board.id + '/', newBoard, {headers: this.httpHeaders})
  } */

  updateBoard(updatedBoard) {
    localStorage.setItem('currentBoard', JSON.stringify(updatedBoard));
    return this.http.put(this.baseurl + 'boards/boards/' + updatedBoard.id + '/', updatedBoard, {headers: this.httpHeaders});
  }
}

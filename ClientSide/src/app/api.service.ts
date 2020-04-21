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
  
  userPic() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).profile_picture;
    } else {
      return "../assets/images/user-images/default-user.jpg";
    }
  }

  userPicture(user, file) {
    const uploadData = new FormData();
    uploadData.append('first_name', user.first_name);
    uploadData.append('last_name', user.last_name);
    uploadData.append('email', user.email);
    uploadData.append('pw', user.pw);
    uploadData.append('notifications', user.notifications);
    uploadData.append('profile_picture', file, file.name);
    return this.http.put(this.baseurl + 'my_users/_user/' + user.email + '/', uploadData);
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

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(this.baseurl + 'my_users/_user/' + email + '/', {headers: this.httpHeaders});
  }

  signup(user): Observable<any> {
    return this.http.post(this.baseurl + 'my_users/my_users/', user, {headers: this.httpHeaders});
  }

  updateUser(user) {
    var updated = {first_name: user.first_name, last_name: user.last_name, email: user.email, pw: user.pw, notifications: user.notifications};
    return this.http.put(this.baseurl + 'my_users/_user/' + updated.email + '/', updated, {headers: this.httpHeaders})
  }

  removeUser(user) {
    return this.http.delete(this.baseurl + 'my_users/_user/' + user.email + '/', {headers: this.httpHeaders});
  }

  // board control

  setBoard(board) {
    localStorage.setItem('currentBoard', JSON.stringify(board));
  }

  boardPicture(board, file) {
    const uploadData = new FormData();
    uploadData.append('id', board.id);
    uploadData.append('name', board.name);
    uploadData.append('owner', board.owner);
    uploadData.append('desc', board.desc);
    uploadData.append('users', board.users);
    uploadData.append('permissions', board.permissions);
    uploadData.append('creation_time', board.creation_time);
    uploadData.append('last_opened', board.last_opened);
    uploadData.append('json_board', board.json_board);
    uploadData.append('thumbnail_picture', file, file.name);
    return this.http.put(this.baseurl + 'boards/boards/' + board.id + '/', uploadData);
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

  getUsers(boardId) {
    return this.http.get(this.baseurl + 'users_in_board/get_users_in_board/?search=' + boardId, {headers: this.httpHeaders});
  }

  removeBoard(userId: number, boardId: number) {
    return this.http.delete(this.baseurl + 'boards/boards/' + boardId + '/', {headers: this.httpHeaders});
  }

  updateBoard(updatedBoard) {
    var newBoard = {id: updatedBoard.id, name: updatedBoard.name, owner: updatedBoard.owner, desc: updatedBoard.desc, users: updatedBoard.users, permissions: updatedBoard.permissions, creation_time: updatedBoard.creation_time, last_opened: updatedBoard.last_opened, json_board: updatedBoard.json_board};
    localStorage.setItem('currentBoard', JSON.stringify(updatedBoard));
    return this.http.put(this.baseurl + 'boards/boards/' + updatedBoard.id + '/', newBoard, {headers: this.httpHeaders});
  }
}

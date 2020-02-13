import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000/"; 
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  userLogged = false;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
  }

  // user authentication

  isUserLogged() {
    return this.userLogged;
  }
  
  getAllUsers(): Observable<any>{
    return this.http.get(this.baseurl + '/users/', {headers: this.httpHeaders});
  }

  login(email: string): Observable<any> {
    return this.http.get(this.baseurl + 'my_users/get_user/?search=' + email, {headers: this.httpHeaders});
  }

  signup(user): Observable<any> {
    const newUser = {first_name: user.firstName, last_name: user.lastName, email: user.email, pw: user.pw};
    return this.http.post(this.baseurl + 'my_users/my_users/', newUser, {headers: this.httpHeaders});
  }
  
  getBoards(user: string) {
    return this.http.get(this.baseurl + 'boards' + '/myuser/', {headers: this.httpHeaders});
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

  createBoard(user: string): Observable<any> {
    return this.http.post(this.baseurl + '/boards/', user, {headers: this.httpHeaders});
  }

  shareBoard() {

  }

  removeBoard() {

  }

  saveCanvas() {

  }

  getCanvas() {

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

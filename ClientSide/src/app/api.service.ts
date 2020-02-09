import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }
  
  getAllUsers(): Observable<any>{
    return this.http.get(this.baseurl + '/users/', {headers: this.httpHeaders});
  }

  login(id: number): Observable<any> {
    return this.http.get(this.baseurl + 'my_users/my_users/' + id + '/', {headers: this.httpHeaders});
  }

  signup(user: string): Observable<any> {
    const newUser = JSON.parse(user);
    const newNewUser = {first_name: newUser.firstName, last_name: newUser.lastName, email: newUser.email, pw: newUser.pw};
	//console.log(newUser);
	console.log(newNewUser);
    return this.http.post(this.baseurl + 'my_users/my_users/', newNewUser, {headers: this.httpHeaders});
  }
  
  createBoard(user: string): Observable<any> {
    return this.http.post(this.baseurl + '/boards/', user, {headers: this.httpHeaders});
  }
  
  getBoards(user: string) {
    return this.http.get(this.baseurl + 'boards' + '/myuser/', {headers: this.httpHeaders});
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

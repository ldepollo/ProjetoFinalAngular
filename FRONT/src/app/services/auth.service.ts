import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  header = new HttpHeaders().set('Content-type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void { }

  getAuthToken(loginData: any): Observable<string | null> {
    return this.http.post<string>(`http://localhost:5000/login`, {
      "login": loginData.login,
      "senha": loginData.senha
    }, { headers: this.header })
  }

  isAuthenticated() {
    if (localStorage.getItem('token') === null) {
      return false
    } else {
      return true
    }
  }
}

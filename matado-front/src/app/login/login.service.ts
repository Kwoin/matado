import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  jwt: string;

  constructor(private http: HttpClient,
              private router: Router) { }

  login(credential: {username: string, password: string}): Observable<string> {
    return this.http.post("/api/login", credential, {responseType: "text"}).pipe(
      tap(jwt => this.jwt = jwt),
      map(jwt => ""),
      catchError(err => {
        let message = "";
        if (err.status === 401) {
          message = "Le nom d'utilisateur ou le mot de passe est incorrect";
        }
        return of(message);
      })
    );
  }

  logout() {
    this.jwt = null;
    this.router.navigate(["/login"]);
  }

  isLoggedIn() {
    return !!this.jwt;
  }

}

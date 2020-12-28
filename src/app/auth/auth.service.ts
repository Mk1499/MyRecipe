import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators'
import { Subject, throwError, BehaviorSubject } from 'rxjs'


export interface AuthResData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey: string = "AIzaSyBXlWW7pwfFTebpb-O_K3pnr9n7TdDFb10";

  user = new BehaviorSubject<User>(null);
  token: string = null;
  tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey;
    return this.http.post<AuthResData>(url, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(res => {
        console.log("User Res Data ", res);

        this.handleAuthentication(
          res.email,
          res.localId,
          res.idToken,
          +res.expiresIn)
      })
    )
  }

  autoLogin() {
    let userData: {
      id: string;
      email: string;
      _token: string;
      _tokenExpireDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpireDate));

    if (loadedUser.token) {
      const expireTime = new Date (userData._tokenExpireDate).getTime() - new Date().getTime();
      this.user.next(loadedUser);
      this.autoLogOut(expireTime)
    }
  }

  login(email: string, password: string) {
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey;

    return this.http.post<AuthResData>(url, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(res => {
        console.log("User Res Data ", res);
        this.handleAuthentication(
          res.email,
          res.localId,
          res.idToken,
          +res.expiresIn)
      })
    )

  }

  autoLogOut(expirationDate: number) {
    console.log("Time : ",expirationDate);

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDate)
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(
        this.tokenExpirationTimer
      )
    }
    this.tokenExpirationTimer = null;
  }


  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

    const expireDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expireDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogOut(expiresIn * 1000)
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errMsg: string = "An Error Occure";
    console.log("ER : ", errorRes);

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errMsg)
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMsg = `The Email is already exists`;
        break;
      case 'INVALID_PASSWORD':
        errMsg = `Invalid Password`;
        break;
      case "EMAIL_NOT_FOUND":
        errMsg = "Email not found";
        break;
    }
    return throwError(errMsg);
  }

}

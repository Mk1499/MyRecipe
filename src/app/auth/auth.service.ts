import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators'
import { Subject, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
// import { clearTimeout } from 'timers';

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


  // user = new BehaviorSubject<User>(null);
  token: string = null;
  tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  // signUp(email: string, password: string) {
  //   const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseApiKey;
  //   return this.http.post<AuthResData>(url, {
  //     email,
  //     password,
  //     returnSecureToken: true
  //   }).pipe(
  //     catchError(this.handleError),
  //     tap(res => {
  //       console.log("User Res Data ", res);

  //       this.handleAuthentication(
  //         res.email,
  //         res.localId,
  //         res.idToken,
  //         +res.expiresIn)
  //     })
  //   )
  // }



  // login(email: string, password: string) {
  //   const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseApiKey;

  //   return this.http.post<AuthResData>(url, {
  //     email,
  //     password,
  //     returnSecureToken: true
  //   }).pipe(
  //     catchError(this.handleError),
  //     tap(res => {
  //       console.log("User Res Data ", res);
  //       this.handleAuthentication(
  //         res.email,
  //         res.localId,
  //         res.idToken,
  //         +res.expiresIn)
  //     })
  //   )
  // }

  setLogoutTimer(expirationDate: number) {
    console.log("Time : ", expirationDate);

    this.tokenExpirationTimer = setTimeout(() => {
      // this.logout()
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDate)
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  // logout() {
  //   // this.user.next(null);
  //   this.store.dispatch(new AuthActions.Logout())
  //   localStorage.removeItem('userData');
  //   this.router.navigate(['/auth']);
  //   if (this.tokenExpirationTimer) {
  //     clearTimeout(
  //       this.tokenExpirationTimer
  //     )
  //   }
  //   this.tokenExpirationTimer = null;
  // }


  // private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

  //   const expireDate = new Date(new Date().getTime() + expiresIn * 1000)
  //   const user = new User(email, userId, token, expireDate);
  //   // this.user.next(user);
  //   this.store.dispatch(new AuthActions.AuthenticateSuccess({
  //     email,
  //     userId,
  //     token,
  //     expirationDate: expireDate

  //   }))
  //   localStorage.setItem('userData', JSON.stringify(user));
  //   this.autoLogOut(expiresIn * 1000)
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errMsg: string = "An Error Occure";
  //   console.log("ER : ", errorRes);

  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errMsg)
  //   }

  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errMsg = `The Email is already exists`;
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errMsg = `Invalid Password`;
  //       break;
  //     case "EMAIL_NOT_FOUND":
  //       errMsg = "Email not found";
  //       break;
  //   }
  //   return throwError(errMsg);
  // }

}

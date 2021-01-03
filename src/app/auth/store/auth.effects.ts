import { AuthService } from './../auth.service';
import { User } from './../user.model';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { loadavg } from 'os';

const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseApiKey;
const signupUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseApiKey;


export interface AuthResDataEffect {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

const handleAuthentication = (resData: AuthResDataEffect) => {
  const expireDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
  const user = new User(resData.email, resData.localId, resData.idToken, expireDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: resData.email,
    userId: resData.localId, token: resData.idToken, expirationDate: expireDate
  });
};

const handleError = (errorRes) => {
  let errMsg: string = "An Error Occure";
  console.log("ER : ", errorRes);

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthentiateFail(errMsg))
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

  return of(new AuthActions.AuthentiateFail("Error : " + errMsg)) // of() is a rxjs operator resturn observable

}

@Injectable()
export class AuthEffect {


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) { }




  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http.post<AuthResDataEffect>(signupUrl, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(
        tap(resData => {
          this.auth.setLogoutTimer(+resData.expiresIn * 1000)
        }),
        map(resData => {
          return handleAuthentication(resData)

        }),
        catchError(errRes => {
          return handleError(errRes)
        })
      )
    })
  )

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      console.log("Called from effect");

      return this.http.post<AuthResDataEffect>(url, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(
        tap(resData => {
          this.auth.setLogoutTimer(+resData.expiresIn * 1000)
        }),
        map(resData => {
          return handleAuthentication(resData)
        }),
        catchError(errorRes => {
          return handleError(errorRes)
        })
      )
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      let userData: {
        id: string;
        email: string;
        _token: string;
        _tokenExpireDate: Date
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: "Dummy" };
      }
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpireDate));

      if (loadedUser.token) {
        const expireTime = new Date(userData._tokenExpireDate).getTime() - new Date().getTime();
        // this.user.next(loadedUser);
        this.auth.setLogoutTimer(expireTime);

        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpireDate)
        })

        // this.autoLogOut(expireTime)
      } else {
        return { type: "Dummy" }
      }
    })
  )


  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    //  switchMap((authData:AuthActions.Logout) => {
    //    localStorage.removeItem('userData');
    //  })
    tap(() => {
      this.auth.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth'])
    })
  )

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      // alert("Called")
      this.router.navigate(['/'])
    })
  )

}

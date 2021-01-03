import { User } from './../user.model';
import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = "[Auth] AUTHENTICATE_SUCCESS";
export const AUTHENTICATE_FAIL = "[Auth] Authenticate Fail";
export const LOGOUT = "[Auth] LOGOUT";
export const LOGIN_START = "[Auth] Login Start";
export const AUTO_LOGIN = "[Auth] Auto Login";

export const SIGNUP_START = "[Auth] Signup Start";


export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date
  }) { }
}

export class AuthentiateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) { }
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload:{
    email:string;
    password:string;
  }){}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) { }
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}


export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthentiateFail | SignupStart | AutoLogin

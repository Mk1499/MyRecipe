import { User } from './../user.model';
import * as AuthActions from './auth.action';


export interface State {
  user: User,
  authError: string;
  loading: boolean;
}

const intialState: State = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(state: State = intialState, action: AuthActions.AuthActions) {

  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        authError: null,
        loading: false
      }

    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true,
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false
      }
    case AuthActions.AUTHENTICATE_FAIL:

      return {
        ...state,
        authError: action.payload,
        loading: false

      }
    default:
      return state;
  }
}

import { exhaustMap, take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private store : Store<fromApp.AppState>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }

        const modReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(modReq)
      })
    )
  }
}

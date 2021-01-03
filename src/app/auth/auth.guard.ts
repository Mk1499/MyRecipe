import { map, tap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      map(user => {
        return user ? true : this.router.createUrlTree(['/auth'])
      }),
      // tap(isAuth => {
      //   if (!isAuth){
      //     this.router.navigate(['/auth'])
      //   }
      // })
    )
  }
}

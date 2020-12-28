import { map, tap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        return user ? true :  this.router.createUrlTree(['/auth'])
      }),
      // tap(isAuth => {
      //   if (!isAuth){
      //     this.router.navigate(['/auth'])
      //   }
      // })
    )
  }
}

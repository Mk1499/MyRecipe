import { AuthService } from './auth/auth.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  checkTs = "checkTs"
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) { }
  ngOnInit() {
    // if (isPlatformBrowser(this.platformId)) {
      // this.authService.autoLogin()
      this.store.dispatch(new AuthActions.AutoLogin())
    // }
  }
}

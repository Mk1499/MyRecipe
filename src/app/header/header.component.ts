import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authSer: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogOut() {
    // this.authSer.logout()
    this.store.dispatch(new AuthActions.Logout())
  }
}

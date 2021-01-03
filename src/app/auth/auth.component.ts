import { PlaceHolderDirective } from './../shared/placeholder/placeholder.directive';
import { Router } from '@angular/router';
import { AuthService, AuthResData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component'
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;
  closeSub: Subscription;
  storeSub: Subscription;

  constructor(
    private authSer: AuthService,
    private router: Router,
    private compFactResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
   this.storeSub =  this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;

      if (this.error) {
        this.showErrorAlert(this.error)
      }
    })
  }

  onSwithMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }
    let { email, password } = form.value;
    let authObs: Observable<AuthResData>

    this.isLoading = true;



    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({
        email,
        password
      }))
      // authObs = this.authSer.login(email, password)

    } else {
      // authObs = this.authSer.signUp(email, password)
      this.store.dispatch(new AuthActions.SignupStart({
        email,
        password
      }))

    }



    // authObs.subscribe(res => {
    //   this.isLoading = false;
    //   this.router.navigate(['./recipes'])
    // }, (err) => {
    //   this.error = err;
    //   this.isLoading = false;
    //   this.showErrorAlert(err)
    // })
    form.reset()

  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errMsg: string) {
    const alertCompFact = this.compFactResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const compRef = hostViewContainerRef.createComponent(alertCompFact)
    compRef.instance.message = errMsg;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })

  }



  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub){
      this.storeSub.unsubscribe();
    }
  }
}

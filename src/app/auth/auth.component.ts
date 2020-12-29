import { PlaceHolderDirective } from './../shared/placeholder/placeholder.directive';
import { Router } from '@angular/router';
import { AuthService, AuthResData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy{

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;
  closeSub: Subscription;

  constructor(
    private authSer: AuthService,
    private router: Router,
    private compFactResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
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
      authObs = this.authSer.login(email, password)
    } else {
      authObs = this.authSer.signUp(email, password)
    }

    authObs.subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['./recipes'])
    }, (err) => {
      this.error = err;
      this.isLoading = false;
      this.showErrorAlert(err)
    })
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



  ngOnDestroy(){
    if (this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}

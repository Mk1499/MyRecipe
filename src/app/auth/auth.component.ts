import { Router } from '@angular/router';
import { AuthService, AuthResData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authSer: AuthService,
    private router:Router
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
    })
    form.reset()

  }

}
